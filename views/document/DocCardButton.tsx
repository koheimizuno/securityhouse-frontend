'use client'

import { getImageAlt } from '@/utils/getImageAlt'
import Image from 'next/image'

type DocCardButtonProps = {
  title: string
  icon?: string
  subicon?: string
  className?: string
  size?: 'lg' | 'md' | 'sm'
}

const DocCardButton = ({
  title,
  icon = '/images/icons/pdf-icon.svg',
  subicon = '/images/icons/download-icon.svg',
  className,
  size = 'md'
}: DocCardButtonProps) => {
  return (
    <div
      className={`bg-colorGray1 border border-colorGray3 rounded flex justify-between items-center gap-8 ${
        size === 'lg' ? 'px-6 py-5' : 'px-5 py-4'
      } ${className}`}
    >
      <div className={`flex items-center ${size === 'lg' ? 'gap-3 md:gap-6' : 'gap-3'}`}>
        <Image
          src={icon}
          alt={getImageAlt(icon) || ''}
          className={`${size === 'lg' ? 'h-7' : 'h-5'}`}
          width={20}
          height={20}
        />
        <p className={`${size === 'sm' ? 'text-sm' : 'text-sm md:text-base'} ${size === 'md' && 'font-bold'} `}>
          {title}
        </p>
      </div>
      <Image
        src={subicon}
        alt={getImageAlt(subicon) || ''}
        className={`${size === 'lg' ? 'h-5' : 'h-4'}`}
        width={16}
        height={16}
      />
    </div>
  )
}

export default DocCardButton
