'use client'

import React from 'react'

interface PageHeaderProps {
  title: string
  className?: string
}

const PageHeader = ({ title, className }: PageHeaderProps) => {
  return <h1 className={`text-2xl sm:text-3xl md:text-[40px] font-bold mb-[40px] ${className}`}>{title}</h1>
}

export default PageHeader
