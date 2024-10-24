'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@nextui-org/react'

import { getImageAlt } from '@/utils/getImageAlt'
import { formatDate } from '@/utils/formatDate'

interface PostItemProps {
  id: string
  userName: string
  affiliation: string
  avatar: string
  title: string
  content: string
  isBookmarked: boolean
  onClickBookmark: () => void
  updatedAt: string
}

const PostItem = ({
  id,
  userName,
  affiliation,
  avatar,
  title,
  content,
  isBookmarked,
  onClickBookmark,
  updatedAt
}: PostItemProps) => {
  return (
    <li className='border border-colorGray2 rounded-lg px-9 py-6 w-full shadow-md'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-8'>
          <Image src={avatar} alt={getImageAlt(avatar) || ''} width={44} height={44} />
          <div className='flex flex-col gap-1'>
            <p className='text-[15px]'>
              {userName}/{affiliation}
            </p>
            <p className='text-xs text-colorGray3'>{formatDate(updatedAt)}</p>
          </div>
          <Button size='sm' color='primary' className='rounded-full text-xs px-2 py-0 h-6'>
            事務局からのご案内
          </Button>
        </div>
        <Link href={`#`}>
          <Image src='/images/icons/more-vertical.svg' alt='more-vertical' width={20} height={20} />
        </Link>
      </div>
      <a href='#'>
        <h3 className='py-4 underline'>{title}</h3>
      </a>
      <p className='text-sm line-clamp-2'>{content}</p>
      <button className='text-[15px] text-colorGray3'>…もっと見る</button>
      <div className='mt-4 flex items-center gap-2'>
        <Image src='/images/icons/thumbs-up.svg' alt='thumb-up' width={20} height={20} />
        <span>44</span>
      </div>
    </li>
  )
}

export default PostItem
