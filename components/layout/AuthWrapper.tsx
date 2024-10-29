'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { isPublicPage } from '@/utils/isPublicPage'
import { AuthContext } from '@/hooks/AuthContext'
import axios from 'axios'

const AuthWrapper = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const pathname = usePathname()
  const router = useRouter()
  const isPublic = isPublicPage(pathname)
  const token: string | null = localStorage.getItem('token')

  const isAuthenticated = !!token

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `JWT ${JSON.parse(token)}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [pathname, router, token])

  useEffect(() => {
    if (!isPublic && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isPublic, router, pathname])

  return <AuthContext.Provider value={isAuthenticated}>{children}</AuthContext.Provider>
}

export default AuthWrapper
