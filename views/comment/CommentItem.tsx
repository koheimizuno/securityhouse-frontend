'use client'

import React, { memo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@nextui-org/react'

import { getImageAlt } from '@/utils/getImageAlt'
import { useClickAway } from '@uidotdev/usehooks'
import { formatDate } from '@/utils/formatDate'

interface CommentItemProps {
  userName: string
  userCompany: string
  avatar: string
  comment: string
  updatedAt: string
}

const CommentItem = ({ userName, userCompany, avatar, comment, updatedAt }: CommentItemProps) => {
  const [moreActive, setMoreActive] = useState<boolean>(false)

  const ref = useClickAway<HTMLDivElement>(() => {
    setMoreActive(false)
  })
  return (
    <li className='px-5 py-5 md:px-9 md:py-6 w-full flex flex-col gap-5 border border-colorGray2 rounded-lg shadow-md'>
      <div>
        <Button size='sm' color='primary' className='inline-block md:hidden rounded-full text-xs px-2 py-0 h-6'>
          事務局からのご案内
        </Button>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2 md:gap-8'>
          <Image src={avatar} alt={getImageAlt(avatar) || ''} width={44} height={44} />
          <div className='flex flex-col gap-1 text-sm md:text-base'>
            <p className='text-[15px]'>
              {userName}/{userCompany}
            </p>
            <p className='text-xs text-colorGray3'>{formatDate(updatedAt)}</p>
          </div>
          <Button size='sm' color='primary' className='hidden md:block rounded-full text-xs px-2 py-0 h-6'>
            事務局からのご案内
          </Button>
        </div>
        <div ref={ref} className='relative'>
          <button onClick={() => setMoreActive(!moreActive)}>
            <Image src='/images/icons/more-icon.svg' alt='more-icon' width={32} height={32} />
          </button>
          {moreActive && (
            <ul className='bg-white absolute z-10 top-4 right-4 md:left-4 w-[150px] flex flex-col shadow-md rounded-md'>
              <li className='px-6 py-2 rounded-md hover:bg-colorGray1'>
                <Link href={`#`}>通報する</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      <p className='text-sm line-clamp-2'>{comment}</p>
      <div className='flex justify-end items-center gap-8'>
        <div className='flex items-center gap-2'>
          <Image src='/images/icons/thumbs-up.svg' alt='thumb-up' width={20} height={20} />
          <span>44</span>
        </div>
        <Button color='primary' size='sm' className='rounded-full'>
          返信する
        </Button>
      </div>
    </li>
  )
}

export default memo(CommentItem)
