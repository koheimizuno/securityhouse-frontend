'use client'

import React, { memo } from 'react'
import Image from 'next/image'
import { Button } from '@nextui-org/react'
import { NewsType } from '@/types/newsType'
import { formatDate } from '@/utils/formatDate'

interface NewsMdItemProps extends Partial<NewsType> {
  name: string
  affiliation_name: string
  thumbnail: string
}

const NewsMdItem = ({ title, content, name, affiliation_name, bookmark_flag, updated_at }: NewsMdItemProps) => {
  return (
    <li className='bg-white rounded-xl px-10 py-6 border-b border-colorGray2 w-full border-t md:border-t-0'>
      <div className='flex flex-col-reverse gap-4 md:flex-row md:justify-between md:items-center'>
        <div className='flex justify-between md:justify-start items-center gap-6'>
          <span className='text-xs text-colorGray4 hidden md:block'>{updated_at}</span>
          <p className='flex items-center gap-3'>
            <Image src='/images/icons/user-icon-sm.svg' alt='user-icon-sm' width={12} height={12} />
            <span className='text-xs'>
              {name}／{affiliation_name}
            </span>
          </p>
          <Button
            value='事務局からのご案内'
            size='sm'
            color='primary'
            className='text-xs px-2 py-0 h-6 rounded-full w-fit'
          >
            事務局からのご案内
          </Button>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-xs text-colorGray4 md:hidden'>{updated_at && formatDate(updated_at)}</span>
          <div className='flex items-center gap-2'>
            <span className='text-xs text-colorGray4'>ブックマークに追加</span>
            <a href='#'>
              <Image
                src={bookmark_flag === '1' ? '/images/icons/bookmark-fill.svg' : '/images/icons/bookmark-outline.svg'}
                alt='bookmark-off-sm'
                className='w-5 h-5'
                width={20}
                height={20}
              />
            </a>
          </div>
        </div>
      </div>
      <a href='#'>
        <h3 className='py-4 underline'>{title}</h3>
      </a>
      <p className='text-sm line-clamp-1'>{content}</p>
    </li>
  )
}

export default memo(NewsMdItem)
