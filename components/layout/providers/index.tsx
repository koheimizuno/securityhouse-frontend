'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

import ReduxProvider from '@/components/layout/providers/ReduxProvider'
import ToasterProvider from '@/components/layout/providers/ToasterProvider'
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

  useEffect(() => {
    let tokenJSON: string | null = localStorage.getItem('token')
    if (tokenJSON) {
      let token = JSON.parse(tokenJSON)
      axios.defaults.headers.common['Authorization'] = `JWT ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [])

  if (!hasMounted) {
    return null
  }

  return (
    <ReduxProvider>
      <NextUIProvider>
        <ToasterProvider />
        {children}
      </NextUIProvider>
    </ReduxProvider>
  )
}

export default Providers
