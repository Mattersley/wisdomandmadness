import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { success: false, error: 'Expected multipart payload context.' },
        { status: 400 }
      )
    }

    const formData = await request.formData()

    // Extract base client data values
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const budget = formData.get('budget') as string
    const timeline = formData.get('timeline') as string
    const projectStatus = formData.get('projectStatus') as string
    const visionDetails = formData.get('visionDetails') as string
    const petName = formData.get('petName') as string
    const petBio = formData.get('petBio') as string

    // De-serialize array matrices safely
    const services = JSON.parse((formData.get('services') as string) || '[]')
    const inspiration = JSON.parse(
      (formData.get('inspiration') as string) || '[]'
    )

    let petImageUrl: string | null = null

    // Extract file evidence buffer cleanly if present
    const file = formData.get('petImage') as File | null
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      // Construct a collision-free file identifier
      const fileExtension = file.name.split('.').pop()
      const fileName = `${crypto.randomUUID()}.${fileExtension}`
      const filePath = `uploads/${fileName}`

      // Stream the raw array buffer up to your targeted Supabase storage cluster
      const { data: storageData, error: storageError } =
        await supabaseAdmin.storage
          .from('pet-evidence')
          .upload(filePath, buffer, {
            contentType: file.type,
            upsert: true
          })

      if (storageError) {
        throw new Error(
          `Supabase Asset Storage Fault: ${storageError.message}`
        )
      }

      // Generate the public distribution link reference
      const { data: publicUrlData } = supabaseAdmin.storage
        .from('pet-evidence')
        .getPublicUrl(filePath)

      petImageUrl = publicUrlData?.publicUrl || null
    }

    // Insert data into your PostgreSQL table
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
      throw new Error(`Supabase Database Write Fault: ${dbError.message}`)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Intake dataset registered into database engine successfully.',
        record: dbData
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('[API_DATABASE_ERROR]', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal database processing failure.'
      },
      { status: 500 }
    )
  }
}
