'use client'

import React, { memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useClickAway } from '@uidotdev/usehooks'

import { formatDate } from '@/utils/formatDate'
import { deletePostAction } from '@/redux-store/slices/postSlice'
import { Button } from '@nextui-org/react'

interface PostCardProps {
  id: string
  title: string
  description: string
  category: string
  tag: string[]
  likeNum: number
  commentNum: number
  isLiked: boolean
  user: {
    name: string
    avatar: string
    company: string
  }
  updatedAt: string
}

const PostCard = ({
  id,
  title,
  description,
  category,
  tag,
  likeNum,
  commentNum,
  isLiked,
  user,
  updatedAt
}: PostCardProps) => {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const [moreActive, setMoreActive] = useState<boolean>(false)

  const ref = useClickAway<HTMLDivElement>(() => {
    setMoreActive(false)
  })

  const hrefHandle = () => {
    if (category && id)
      switch (category) {
        case 'SH会ルーム':
          return `/chatroom/sh-room/post/${id}`
        case '仕事ルーム':
          return `/chatroom/work-room/post/${id}`
        case '交流ルーム':
          return `/chatroom/exchange-room/post/${id}`
        case '社長室ルーム':
          return `/chatroom/boss-room/post/${id}`
      }
  }

  const handleDeletePost = async () => {
    await dispatch(deletePostAction(id))
    setMoreActive(false)
  }

  return (
    <div className='relative bg-white px-4 py-6 w-[282px] rounded-md'>
      <Image
        src={isLiked ? '/images/icons/bookmark-on.svg' : '/images/icons/bookmark-off.svg'}
        alt={isLiked ? 'bookmark-on' : 'bookmark-off'}
        className='absolute -top-1 right-4 w-8 h-8'
        width={32}
        height={32}
      />
      <p className='text-xs flex items-center gap-1 mb-3'>
        <span className='text-primary'>■</span>
        <span>{category}</span>
      </p>
      <div className='mb-5 flex items-center flex-wrap gap-2'>
        {tag.map((tag, id) => (
          <Button key={id} size='sm' color='primary' className='text-xs px-2 py-0 h-6 rounded-full w-fit'>
            {tag}
          </Button>
        ))}
      </div>
      <Link href={hrefHandle() || '/'}>
        <h3 className='underline truncate text-txtColor'>{title}</h3>
      </Link>
      <p className='text-sm line-clamp-3'>{description}</p>
      <div className='grid grid-cols-2 gap-4 mt-[22px] mb-4'>
        <div className='flex items-center gap-2'>
          <Image src='/images/icons/thumbs-up.svg' alt='thumbs-up' width={20} height={20} />
          <p className='text-sm font-bold text-colorGray4'>
            <a href='#'>いいね！ </a>
            <span>{likeNum} 件</span>
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Image src='/images/icons/comment-icon.svg' alt='comment w-5 h-5' width={20} height={20} />
          <p className='text-sm font-bold text-colorGray4'>
            <a href='#'>コメント</a>
            <span>{commentNum} 件</span>
          </p>
        </div>
      </div>
      <hr className='border-b border-colorGray4' />
      <div className='flex items-center gap-2 mt-4 mb-3'>
        <Image src='/images/icons/user-icon00.svg' alt='user-icon00 w-6 h-6' width={24} height={24} />
        <p className='text-sm'>
          {user.name}/{user.company}
        </p>
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-colorGray4'>{formatDate(updatedAt)}</p>
        <div ref={ref} className='relative'>
          <button onClick={() => pathname !== '/' && setMoreActive(!moreActive)}>
            <Image src='/images/icons/more-icon.svg' alt='more-icon' width={32} height={32} />
          </button>
          {moreActive && (
            <ul className='bg-white absolute z-10 top-4 left-4 w-[150px] flex flex-col shadow-md rounded-md'>
              <li className='px-6 py-2 rounded-md hover:bg-colorGray1'>
                <Link href={`/chatroom/post/edit/${id}`}>編集する</Link>
              </li>
              <li className='px-6 py-2 rounded-md hover:bg-colorGray1 cursor-pointer' onClick={handleDeletePost}>
                削除する
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(PostCard)
