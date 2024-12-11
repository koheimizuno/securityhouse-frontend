'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

import { isUserPage } from '@/utils/isPublicPage'

interface ContainerProps {
  className?: string
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  const pathname = usePathname()
  const isUser = isUserPage(pathname)

  return <div className={`w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-0 ${isUser? className : 'mt-36 mb-24'}`}>{children}</div>
}

export default Container
