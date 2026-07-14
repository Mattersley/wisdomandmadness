import { NextRequest, NextResponse } from 'next/server'
import { checkBotId } from 'botid/server'
import {
  hasSupabaseAdminConfig,
  supabaseAdmin,
  supabaseAdminKeySource
} from '@/lib/supabase'
import crypto from 'crypto'

export const runtime = 'nodejs'

const MAX_REQUEST_BYTES = 6 * 1024 * 1024
const MAX_PET_IMAGE_BYTES = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/gif', 'gif']
])

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const rateLimitBucket = new Map<string, { count: number; resetAt: number }>()

class ContactRequestError extends Error {
  status: number

  constructor(message: string, status = 400) {
    super(message)
    this.status = status
  }
}

const json = (body: Record<string, unknown>, status: number) =>
  NextResponse.json(body, { status })

const getClientIp = (request: NextRequest) => {
  const forwardedFor = request.headers.get('x-forwarded-for')
  return (
    forwardedFor?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

const isRateLimited = (key: string) => {
  const now = Date.now()
  const current = rateLimitBucket.get(key)

  if (!current || current.resetAt <= now) {
    rateLimitBucket.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS
    })
    return false
  }

  current.count += 1
  return current.count > RATE_LIMIT_MAX_REQUESTS
}

const asBoundedString = (
  formData: FormData,
  key: string,
  maxLength: number,
  required = false
) => {
  const value = formData.get(key)
  const text = typeof value === 'string' ? value.trim() : ''

  if (required && !text) {
    throw new ContactRequestError(`${key} is required.`)
  }

  if (text.length > maxLength) {
    throw new ContactRequestError(
      `${key} must be ${maxLength} characters or fewer.`
    )
  }

  return text
}

const parseJsonField = <T>(formData: FormData, key: string, fallback: T): T => {
  const value = formData.get(key)

  if (typeof value !== 'string' || !value.trim()) {
    return fallback
  }

  try {
    return JSON.parse(value) as T
  } catch {
    throw new ContactRequestError(`${key} is not valid JSON.`)
  }
}

const buildVisionDetails = (formData: FormData) => {
  const company = asBoundedString(formData, 'company', 200)
  const visionDetails = asBoundedString(formData, 'visionDetails', 4000)
  const notes = asBoundedString(formData, 'notes', 2000)
  const goals = asBoundedString(formData, 'goals', 2000)
  const targetAudience = asBoundedString(formData, 'targetAudience', 1000)
  const additionalInfo = asBoundedString(formData, 'additionalInfo', 2000)

  if (visionDetails) return visionDetails

  return [
    company && `Organization: ${company}`,
    notes && `Notes: ${notes}`,
    goals && `Goals: ${goals}`,
    targetAudience && `Target audience: ${targetAudience}`,
    additionalInfo && `Additional info: ${additionalInfo}`
  ]
    .filter(Boolean)
    .join('\n\n')
}

const validateListSize = (value: unknown[], key: string, maxLength: number) => {
  if (value.length > maxLength) {
    throw new ContactRequestError(`${key} includes too many entries.`)
  }
}

const validateServices = (services: unknown) => {
  if (!Array.isArray(services)) {
    throw new ContactRequestError('services must be an array.')
  }

  validateListSize(services, 'services', 20)

  services.forEach((service) => {
    if (typeof service !== 'string' || service.length > 120) {
      throw new ContactRequestError('services includes an invalid entry.')
    }
  })

  return services
}

const validateInspiration = (inspiration: unknown) => {
  if (!Array.isArray(inspiration)) {
    throw new ContactRequestError('inspiration must be an array.')
  }

  validateListSize(inspiration, 'inspiration', 20)

  inspiration.forEach((item) => {
    if (
      typeof item !== 'object' ||
      item === null ||
      typeof (item as { url?: unknown }).url !== 'string' ||
      (item as { url: string }).url.length > 1000
    ) {
      throw new ContactRequestError('inspiration includes an invalid entry.')
    }
  })

  return inspiration
}

const verifyBotId = async () => {
  try {
    const botCheck = await checkBotId()

    if (!botCheck.isHuman) {
      console.warn('[SECURITY] BotID blocked contact submission.', botCheck)
      return false
    }

    return true
  } catch (error) {
    console.error('[SECURITY] BotID verification failed.', error)
    return false
  }
}

const isSupabaseInvalidKeyError = (message: string) =>
  message.toLowerCase().includes('invalid api key')

const supabaseConfigError = () =>
  new ContactRequestError(
    `Supabase rejected the configured API key${
      supabaseAdminKeySource ? ` from ${supabaseAdminKeySource}` : ''
    }. Use the project secret API key in SUPABASE_SECRET_KEY.`,
    503
  )

export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0)
    if (contentLength > MAX_REQUEST_BYTES) {
      return json(
        { success: false, error: 'Request payload must be 6MB or smaller.' },
        413
      )
    }

    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('multipart/form-data')) {
      return json(
        { success: false, error: 'Expected multipart form data.' },
        400
      )
    }

    const isHuman = await verifyBotId()
    if (!isHuman) {
      return json(
        { success: false, error: 'Security verification failed.' },
        403
      )
    }

    if (!hasSupabaseAdminConfig || !supabaseAdmin) {
      console.error('[SUPABASE] Missing contact submission configuration.')
      return json(
        {
          success: false,
          error:
            'Contact submissions are not configured. Check SUPABASE_SECRET_KEY and NEXT_PUBLIC_SUPABASE_URL.'
        },
        503
      )
    }

    const ip = getClientIp(request)
    if (isRateLimited(ip)) {
      console.warn(`[SECURITY] Rate limit triggered for ${ip}.`)
      return json(
        { success: false, error: 'Too many submissions. Please try later.' },
        429
      )
    }

    const formData = await request.formData()
    const honeyField = asBoundedString(formData, 'website_confirm_field', 200)
    if (honeyField) {
      console.warn('[SECURITY] Honeypot blocked contact submission.')
      return json({ success: true, message: 'Verified.' }, 200)
    }

    const name = asBoundedString(formData, 'name', 120, true)
    const email = asBoundedString(formData, 'email', 254, true).toLowerCase()
    if (!EMAIL_PATTERN.test(email)) {
      throw new ContactRequestError('email is invalid.')
    }

    const phone = asBoundedString(formData, 'phone', 40)
    const budget = asBoundedString(formData, 'budget', 80)
    const timeline = asBoundedString(formData, 'timeline', 80)
    const projectStatus = asBoundedString(formData, 'projectStatus', 80)
    const visionDetails = buildVisionDetails(formData)
    const petName = asBoundedString(formData, 'petName', 120)
    const petBio = asBoundedString(formData, 'petBio', 1000)

    const services = validateServices(
      parseJsonField<string[]>(formData, 'services', [])
    )
    const inspiration = validateInspiration(
      parseJsonField<{ url: string }[]>(formData, 'inspiration', [])
    )

    let petImageUrl: string | null = null
    const file = formData.get('petImage')

    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_PET_IMAGE_BYTES) {
        return json(
          { success: false, error: 'Pet image must be 5MB or smaller.' },
          413
        )
      }

      const fileExtension = ALLOWED_IMAGE_TYPES.get(file.type)
      if (!fileExtension) {
        return json(
          {
            success: false,
            error: 'Pet image must be a JPEG, PNG, WebP, or GIF.'
          },
          400
        )
      }

      const buffer = Buffer.from(await file.arrayBuffer())
      const fileName = `${crypto.randomUUID()}.${fileExtension}`
      const filePath = `uploads/${fileName}`

      const { error: storageError } = await supabaseAdmin.storage
        .from('pet-evidence')
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false
        })

      if (storageError) {
        if (isSupabaseInvalidKeyError(storageError.message)) {
          throw supabaseConfigError()
        }

        throw new Error(`Supabase Storage: ${storageError.message}`)
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from('pet-evidence')
        .getPublicUrl(filePath)
      petImageUrl = publicUrlData?.publicUrl || null
    }

    const { data: dbData, error: dbError } = await supabaseAdmin
      .from('project_inquiries')
      .insert([
        {
          name,
          email,
          phone,
          budget,
          timeline,
          project_status: projectStatus,
          vision_details: visionDetails,
          services,
          inspiration,
          pet_name: petName,
          pet_bio: petBio,
          pet_image_url: petImageUrl
        }
      ])
      .select()

    if (dbError) {
      if (isSupabaseInvalidKeyError(dbError.message)) {
        throw supabaseConfigError()
      }

      throw new Error(`Database: ${dbError.message}`)
    }

    return json(
      { success: true, message: 'Intake registered.', record: dbData },
      200
    )
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to process submission.'
    const status = error instanceof ContactRequestError ? error.status : 500
    console.error('[API_CONTACT_ERROR]', error)
    return json({ success: false, error: message }, status)
  }
}
