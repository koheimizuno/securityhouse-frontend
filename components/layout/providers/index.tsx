'use client'

import ClientOnly from '@/components/layout/ClientOnly'
import ReduxProvider from './ReduxProvider'
import ToasterProvider from './ToasterProvider'
import { NextUIProvider } from '@nextui-org/react'

const Providers = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <ClientOnly>
      <ReduxProvider>
        <NextUIProvider>
          <ToasterProvider />
          {children}
        </NextUIProvider>
      </ReduxProvider>
    </ClientOnly>
  )
}

export default Providers
