"use client"

import React from "react"
import Image from "next/image"

import getImageAlt from "@/utils/getImageAlt"

type Props = {
  src: string
  title: React.ReactNode
}

const DataLink = ({ src, title }: Props) => {
  return (
    <a
      href='#'
      className='flex justify-between items-center gap-2 xl:w-[288px] h-16 bg-white p-5 border border-primary rounded-md'
    >
      <div className='flex items-center gap-4'>
        <Image src={src} alt={getImageAlt(src) || ""} className='w-6 h-6' width={25} height={25} />
        <p>{title}</p>
      </div>
      <Image src='/images/arrow-right.svg' alt='arrow-right w-3 h-3' width={12} height={12} />
    </a>
  )
}

export default DataLink
