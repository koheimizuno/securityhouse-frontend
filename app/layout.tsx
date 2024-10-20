import type { Metadata } from 'next'
import Providers from '@/components/layout/providers'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

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
        <Providers>
          <Header />
          <main className='mt-[300px] sm:mt-[145px] md:mt-[123px]'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
