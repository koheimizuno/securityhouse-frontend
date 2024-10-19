'use client'

import React from 'react'
import Image from 'next/image'

import { getImageAlt } from '@/utils/getImageAlt'

interface SectionTitleProps {
  title: string
  icon?: string
  className?: string
}

const SectionTitle = ({ title, icon, className }: SectionTitleProps) => {
  return (
    <div className='w-full flex items-center gap-2'>
      {icon && (
        <Image
          src={icon}
          alt={getImageAlt(icon) ?? ''}
          className='w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]'
          width={25}
          height={25}
        />
      )}
      <h2 className={className}>{title}</h2>
    </div>
  )
}

export default SectionTitle
