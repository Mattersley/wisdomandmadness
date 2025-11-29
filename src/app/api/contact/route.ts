import { checkBotId } from 'botid/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const verification = await checkBotId()
  
  if (verification.isBot) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  } else {
    try {
      const body = await request.json()
      const {
        name,
        email,
        company,
        phone,
        budget,
        services,
        timeline,
        projectStatus,
        inspiration,
        projectVision,
        description
      } = body

      // BotID protection is handled via instrumentation-client.ts
      // Requests reaching here have passed the bot check

      // 2. Format the email content (Similar to your previous mailto body)
      const servicesList =
        Array.isArray(services) && services.length > 0
          ? services.map((s: string) => `• ${s}`).join('\n')
          : 'None selected'

      const inspirationLinks = Array.isArray(inspiration)
        ? inspiration
          .map((item: { url: string }) => item.url)
          .filter((url: string) => url)
          .map((url: string) => `• ${url}`)
          .join('\n')
        : 'No links provided'

      const emailContent = `
New Project Inquiry via Website
================================

CONTACT DETAILS
--------------------------------
Name:    ${name || 'N/A'}
Email:   ${email || 'N/A'}
Company: ${company || 'N/A'}
Phone:   ${phone || 'N/A'}

PROJECT OVERVIEW
--------------------------------
Status:   ${projectStatus}
Timeline: ${timeline}
Budget:   $${budget}

SERVICES REQUIRED
--------------------------------
${servicesList}

PROJECT VISION
--------------------------------
${projectVision || description || 'No details provided.'}

DESIGN INSPIRATION
--------------------------------
${inspirationLinks}
    `.trim()

      // 3. Send Email (Integrate your provider here, e.g., Resend, SendGrid, Nodemailer)
      // await sendEmail({ to: 'webinquiry@wisdomandmadness.com', subject: 'New Inquiry', text: emailContent })

      console.log('Form received:', emailContent) // For debugging

      return NextResponse.json({ success: true, message: 'Inquiry sent successfully' })
    } catch (error) {
      console.error('Contact API Error:', error)
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }
  }
}