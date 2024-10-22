'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface ClientOnlyProps {
  children: React.ReactNode
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
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

  return <>{children}</>
}

export default ClientOnly
