'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

import ReduxProvider from '@/components/layout/providers/ReduxProvider'
import ToasterProvider from '@/components/layout/providers/ToasterProvider'
import AuthWrapper from '@/components/layout/AuthWrapper'
import { NextUIProvider } from '@nextui-org/react'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

const Providers = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return (
    <ReduxProvider>
      <AuthWrapper>
        <NextUIProvider>
          <ToasterProvider />
          {children}
        </NextUIProvider>
      </AuthWrapper>
    </ReduxProvider>
  )
}

export default Providers
