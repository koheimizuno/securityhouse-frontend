'use client'

import React from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

const PageHeader = ({ title, subtitle, className }: PageHeaderProps) => {
  return (
    <div className={`flex flex-col`}>
      <span className={`text-primary font-extrabold`}>{subtitle}</span>
      <h1 className={`text-2xl sm:text-[32px] font-bold ${className}`}>{title}</h1>
    </div>
  )
}

export default PageHeader
