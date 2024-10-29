'use client'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const PUBLIC_ROUTES = ['/register', '/login', '/forgot-password', '/profile']

const useIsPublicPage = () => {
  const router = useRouter()
  const [isPublicPage, setIsPublicPage] = useState(false)

  useEffect(() => {
    const isPublic = PUBLIC_ROUTES.includes(router.pathname)
    setIsPublicPage(isPublic)
  }, [router.pathname])

  return isPublicPage
}

export default useIsPublicPage
