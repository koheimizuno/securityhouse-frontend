'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import isPublicPage from '@/utils/isPublicPage'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux-store'
import axios from 'axios'

const AuthWrapper = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const pathname = usePathname()
  const router = useRouter()
  const isPublic = isPublicPage(pathname)
  const { isAuthenticated } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const tokenJSON: string | null = localStorage.getItem('token')
    if (tokenJSON) {
      const token = JSON.parse(tokenJSON)
      axios.defaults.headers.common['Authorization'] = `JWT ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
      router.push('/login')
    }
  }, [pathname, router])

  useEffect(() => {
    if (!isPublic && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isPublic, router, pathname])

  return <>{children}</>
}

export default AuthWrapper
