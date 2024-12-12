'use client'

import React, { memo, useState } from 'react'

import Image from 'next/image'

import { Button } from '@nextui-org/react'
import { NewsType } from '@/types/newsType'
import { formatDate } from '@/utils/formatDate'
import { useAuthentication } from '@/hooks/AuthContext'
import { deleteNewsBookmarkAction, newsBookmarkAction } from '@/actions/newsAction'
import { getImageAlt } from '@/utils/getImageAlt'

const NewsItem = ({
  id,
  title,
  content,
  user_name,
  affiliation_name,
  thumbnail,
  category_name,
  bookmark_flag,
  created_at
}: Partial<NewsType>) => {
  const [bookmark, setBookmark] = useState(bookmark_flag)
  const { session_user_id } = useAuthentication()

  const handleBookmark = () => {
    if (bookmark_flag) {
      if (id) deleteNewsBookmarkAction({ id, user_id: session_user_id }).then(data => setBookmark(data))
    } else {
      if (id) newsBookmarkAction({ id, user_id: session_user_id }).then(data => setBookmark(data))
    }
  }

  return (
    <li className='border-b border-colorGray2 py-4 w-full border-t md:border-t-0'>
      <div className='flex flex-col-reverse gap-4 md:flex-row md:justify-between md:items-center'>
        <div className='flex justify-between md:justify-start items-center gap-6'>
          <span className='text-xs text-colorGray4 hidden md:block'>{created_at && formatDate(created_at)}</span>
          <p className='flex items-center gap-3'>
            <Image src={thumbnail || ''} alt={getImageAlt(thumbnail || '') || ''} width={12} height={12} />
            <span className='text-xs'>
              {user_name}／{affiliation_name}
            </span>
          </p>
          <Button
            value='事務局からのご案内'
            size='sm'
            color='primary'
            className='text-xs px-2 py-0 h-6 rounded-full w-fit'
          >
            {category_name}
          </Button>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-xs text-colorGray4 md:hidden'>{created_at && formatDate(created_at)}</span>
          <div className='flex items-center gap-2'>
            <span className='text-xs text-colorGray4'>ブックマークに追加</span>
            <button onClick={handleBookmark}>
              <Image
                src={bookmark ? '/images/icons/bookmark-fill.svg' : '/images/icons/bookmark-outline.svg'}
                alt='bookmark-off-sm'
                className='w-5 h-5'
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
      <a href={`/news/${id}`}>
        <h3 className='py-4 underline'>{title}</h3>
      </a>
      <p className='text-sm line-clamp-1'>{content}</p>
    </li>
  )
}

export default memo(NewsItem)
