import type { Metadata } from 'next'
import ClientOnly from '@/components/layout/ClientOnly'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

import ReduxProvider from '@/redux-store/ReduxProvider'
import ToasterProvider from '@/providers/ToasterProvider'

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
        <ClientOnly>
          <ReduxProvider>
            <ToasterProvider />
            <Header />
            <main className='mt-[300px] sm:mt-[145px] md:mt-[123px]'>{children}</main>
            <Footer />
          </ReduxProvider>
        </ClientOnly>
      </body>
    </html>
  )
}
