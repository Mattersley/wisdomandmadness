import { Inputs } from '@/features/Inquire/types'

export const MAX_PET_IMAGE_BYTES = 5 * 1024 * 1024

export const ALLOWED_PET_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
]

const appendValue = (
  formData: FormData,
  key: string,
  value: string | undefined | null
) => {
  formData.append(key, value ?? '')
}

export const buildContactFormData = (data: Inputs) => {
  const formData = new FormData()

  appendValue(formData, 'name', data.name)
  appendValue(formData, 'email', data.email)
  appendValue(formData, 'phone', data.phone)
  appendValue(formData, 'company', data.company)
  appendValue(formData, 'notes', data.notes)
  appendValue(formData, 'budget', data.budget)
  appendValue(formData, 'timeline', data.timeline)
  appendValue(formData, 'projectStatus', data.projectStatus)
  appendValue(formData, 'visionDetails', data.visionDetails)
  appendValue(formData, 'goals', data.goals)
  appendValue(formData, 'targetAudience', data.targetAudience)
  appendValue(formData, 'additionalInfo', data.additionalInfo)
  appendValue(formData, 'petName', data.petName)
  appendValue(formData, 'petBio', data.petBio)
  appendValue(formData, 'website_confirm_field', data.website_confirm_field)

  formData.append('services', JSON.stringify(data.services || []))
  formData.append('serviceDetails', JSON.stringify(data.serviceDetails || {}))
  formData.append('inspiration', JSON.stringify(data.inspiration || []))

  const petImage = data.petImage?.[0]
  if (petImage) {
    formData.append('petImage', petImage)
  }

  return formData
}

export const validatePetImage = (files?: FileList) => {
  const file = files?.[0]

  if (!file) return true

  if (file.size > MAX_PET_IMAGE_BYTES) {
    return 'Pet image must be 5MB or smaller'
  }

  if (!ALLOWED_PET_IMAGE_TYPES.includes(file.type)) {
    return 'Pet image must be a JPEG, PNG, WebP, or GIF'
  }

  return true
}
