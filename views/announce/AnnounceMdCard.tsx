'use client'

import React from 'react'
import Image from 'next/image'
import Button from '@/components/common/Button'
import Link from 'next/link'
import { getImageAlt } from '@/utils/getImageAlt'

interface AnnounceMdCardProps {
  id: string
  userName: string
  userCompany: string
  avatar: string
  title: string
  description: string
  isBookmarked: boolean
  onClickBookmark: () => void
  updatedAt: string
}

const AnnounceMdCard = ({
  id,
  userName,
  userCompany,
  avatar,
  title,
  description,
  isBookmarked,
  onClickBookmark,
  updatedAt
}: AnnounceMdCardProps) => {
  return (
    <li className='border border-colorGray2 rounded-lg px-9 py-6 w-full shadow-md'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-8'>
          <Image src={avatar} alt={getImageAlt(avatar) || ''} width={44} height={44} />
          <div className='flex flex-col gap-1'>
            <p className='text-[15px]'>
              {userName}/{userCompany}
            </p>
            <p className='text-xs text-colorGray3'>{updatedAt}</p>
          </div>
          <Button size='sm' value='事務局からのご案内' />
        </div>
        <Link className='' href={`/announce/${id}`}>
          <Image src='/images/more-vertical.svg' alt='more-vertical' width={20} height={20} />
        </Link>
      </div>
      <a href='#'>
        <h3 className='py-4 underline'>{title}</h3>
      </a>
      <p className='text-sm line-clamp-2'>{description}</p>
      <button className='text-[15px] text-colorGray3'>…もっと見る</button>
      <div className='mt-4 flex items-center gap-2'>
        <Image src='/images/thumbs-up.svg' alt='thumb-up' width={20} height={20} />
        <span>44</span>
      </div>
    </li>
  )
}

export default AnnounceMdCard
