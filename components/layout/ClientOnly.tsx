'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ReduxProvider from '@/redux-store/ReduxProvider'

interface ClientOnlyProps {
  children: React.ReactNode
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <ReduxProvider>{children}</ReduxProvider>
}

export default ClientOnly
