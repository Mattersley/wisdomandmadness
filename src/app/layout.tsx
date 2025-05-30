import type { Metadata } from 'next'
import './globals.css'
import { EggProvider } from '@/context/eggContext'

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
      <html lang="en">
        <body className="antialiased">{children}</body>
      </html>
    </EggProvider>
  )
}

export default RootLayout
