import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { EggProvider } from '@/context/eggContext'
import { ContactProvider } from '@/context/contactContext'
import { Analytics } from '@vercel/analytics/next'

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
    <EggProvider>
      <ContactProvider>
        <Analytics />
        <html lang="en">
          <body className="antialiased md:cursor-none">{children}</body>
        </html>
      </ContactProvider>
    </EggProvider>
  )
}

export default RootLayout
