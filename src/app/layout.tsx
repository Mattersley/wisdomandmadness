import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { EggProvider } from '@/features/Madness/Eggs/context/eggContext'
import { ContactProvider } from '@/features/Madness/Contact/context/contactContext'
import { Analytics } from '@vercel/analytics/next'
import { WormProvider } from '@/context/wormContext'
import { VT323, Inter, Instrument_Serif } from 'next/font/google'
import { vagraFont } from '@/app/fonts'
import { SecretCodeProvider } from '@/features/SecretCode/context/secretCodeContext'

const vt323 = VT323({ weight: ['400'], variable: '--font-vt323' })
const inter = Inter({
  weight: ['400', '500', '600'],
  variable: '--font-inter'
})
const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  variable: '--font-instrument-serif'
})

export const metadata: Metadata = {
  title: 'Wisdom & Madness Design Co.',
  description: 'Small Business Web Design.'
}

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <WormProvider>
      <EggProvider>
        <ContactProvider>
          <SecretCodeProvider>
            <Analytics />
            <html
              className={`${vagraFont.variable} ${vt323.variable} ${inter.variable} ${instrumentSerif.variable}`}
              lang="en"
            >
              <body className="">{children}</body>
            </html>
          </SecretCodeProvider>
        </ContactProvider>
      </EggProvider>
    </WormProvider>
  )
}

export default RootLayout
