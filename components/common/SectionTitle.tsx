'use client'

import React from 'react'
import Image from 'next/image'

import { getImageAlt } from '@/utils/getImageAlt'

interface SectionTitleProps {
  title: string
  icon?: string
  bar?: boolean
  wrapperClass?: string
  className?: string
}

const SectionTitle = ({ title, icon, bar, wrapperClass, className }: SectionTitleProps) => {
  return (
    <div className={`w-full flex items-center gap-2 ${wrapperClass}`}>
      {icon && (
        <Image
          src={icon}
          alt={getImageAlt(icon) ?? ''}
          className='w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]'
          width={25}
          height={25}
        />
      )}
      <h2
        className={`${
          bar
            ? 'relative pl-4 after:content-[""] after:w-1 after:h-8 after:bg-secondary after:absolute after:left-0 after:top-0'
            : ''
        } ${className}`}
      >
        {title}
      </h2>
    </div>
  )
}

export default SectionTitle
