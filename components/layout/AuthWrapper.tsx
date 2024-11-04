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
  const loginInfoJSON: string | null = localStorage.getItem('auth')
  const loginInfo = loginInfoJSON && JSON.parse(loginInfoJSON)

  const isAuthenticated = !!loginInfo?.token

  useEffect(() => {
    if (loginInfo?.token) {
      axios.defaults.headers.common['Authorization'] = `JWT ${loginInfo?.token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [pathname, router, loginInfo?.token])

  useEffect(() => {
    if (!isPublic && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isPublic, router, pathname])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user_id: loginInfo?.user_id }}>{children}</AuthContext.Provider>
  )
}

export default AuthWrapper
