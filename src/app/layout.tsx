import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { EggProvider } from '@/context/eggContext'
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
      <Analytics />
      <html lang="en">
        <body className="antialiased">{children}</body>
      </html>
    </EggProvider>
  )
}

export default RootLayout
