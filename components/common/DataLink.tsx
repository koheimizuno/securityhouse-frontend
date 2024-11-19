'use client'

import React from 'react'
import Image from 'next/image'

import { getImageAlt } from '@/utils/getImageAlt'

type Props = {
  img?: string
  href: string
  title: React.ReactNode
  className?: string
}

const DataLink = ({ img, href, title, className }: Props) => {
  return (
    <li>
      <a
        href={href}
        className={`flex justify-between items-center gap-2 h-16 bg-white p-5 border border-primary rounded-md hover:scale-[1.02] transition-all ${className}`}
      >
        <div className='flex items-center gap-4'>
          {img && <Image src={img} alt={getImageAlt(img) || ''} className='w-6 h-6' width={25} height={25} />}
          <p>{title}</p>
        </div>
        <Image src='/images/icons/arrow-right.svg' alt='arrow-right w-3 h-3' width={12} height={12} />
      </a>
    </li>
  )
}

export default DataLink
