import type { Metadata } from 'next'
import LayoutClient from '@/components/layout/LayoutClient'

import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Security House',
  description: 'Portal website for Security House'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
