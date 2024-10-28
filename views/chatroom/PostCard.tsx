'use client'

import React, { memo, useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@nextui-org/react'

import { formatDate } from '@/utils/formatDate'
import { useClickAway } from '@uidotdev/usehooks'
import { deletePostAction } from '@/redux-store/slices/postSlice'
import { PostType, PostType_Type } from '@/types/postType'
import DeletePostModal from '@/components/modal/DeletePostModal'

interface PostCardProps extends Partial<PostType> {
  postTypes: PostType_Type[]
}

const PostCard = ({
  id,
  title,
  content,
  attachments,
  category_name,
  name,
  affiliation_name,
  type_id,
  postTypes,
  like_count,
  comment_count,
  bookmark_flag,
  updated_at
}: PostCardProps) => {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const [moreActive, setMoreActive] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openModal = () => setIsOpen(true)
  const closeModal = useCallback(() => setIsOpen(false), [])

  const postType = useMemo(() => {
    return postTypes?.find(postType => postType.id === type_id)?.title || ''
  }, [postTypes, type_id])

  const ref = useClickAway<HTMLDivElement>(() => {
    setMoreActive(false)
  })

  const handleDeletePost = useCallback(async () => {
    await dispatch(deletePostAction(id))
    setMoreActive(false)
    closeModal()
  }, [dispatch, id, closeModal])

  return (
    <div className='relative bg-white px-4 py-6 w-[282px] rounded-md'>
      <Image
        src={bookmark_flag === '1' ? '/images/icons/bookmark-fill.svg' : '/images/icons/bookmark-outline.svg'}
        alt={bookmark_flag === '1' ? 'bookmark-on' : 'bookmark-off'}
        className='absolute -top-1 right-3 w-8 h-8'
        width={32}
        height={32}
      />
      <p className='text-xs flex items-center gap-1 mb-3'>
        <span className='text-primary'>■</span>
        <span>{postType}</span>
      </p>
      <div className='mb-5 flex items-center flex-wrap gap-2'>
        <Button size='sm' color='primary' className='text-xs px-2 py-0 h-6 rounded-full w-fit'>
          {category_name}
        </Button>
      </div>
      <Link href={`/chatroom/post/${id}`}>
        <h3 className='underline truncate text-txtColor'>{title}</h3>
      </Link>
      <p className='text-sm line-clamp-3'>{content}</p>
      <div className='grid grid-cols-2 gap-4 mt-[22px] mb-4'>
        <div className='flex items-center gap-1'>
          <Image src='/images/icons/thumbs-up.svg' alt='thumbs-up' className='w-5 h-5' width={20} height={20} />
          <p className='text-sm font-bold text-colorGray4'>
            <a href='#'>いいね！ </a>
            <span>{like_count}件</span>
          </p>
        </div>
        <div className='flex items-center gap-1'>
          <Image src='/images/icons/comment-icon.svg' alt='comment' className='w-5 h-5' width={20} height={20} />
          <p className='text-sm font-bold text-colorGray4'>
            <a href='#'>コメント </a>
            <span>{comment_count}件</span>
          </p>
        </div>
      </div>
      <hr className='border-b border-colorGray4' />
      <div className='flex items-center gap-2 mt-4 mb-3'>
        <Image
          src={attachments ? attachments : '/images/icons/user-icon00.svg'}
          alt='user-icon00 w-6 h-6'
          width={24}
          height={24}
        />
        <p className='text-sm'>
          {name}/{affiliation_name}
        </p>
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-colorGray4'>{updated_at && formatDate(updated_at)}</p>
        <div ref={ref} className='relative'>
          <button onClick={() => pathname !== '/' && setMoreActive(!moreActive)}>
            <Image src='/images/icons/more-icon.svg' alt='more-icon' width={32} height={32} />
          </button>
          {moreActive && (
            <ul className='bg-white absolute z-10 top-4 left-4 w-[150px] flex flex-col shadow-md rounded-md'>
              <li className='px-6 py-2 rounded-md hover:bg-colorGray1'>
                <Link href={`/chatroom/post/edit/${id}`}>編集する</Link>
              </li>
              <li className='px-6 py-2 rounded-md hover:bg-colorGray1 cursor-pointer'>
                <button onClick={openModal}>削除する</button>
              </li>
            </ul>
          )}
        </div>
      </div>
      <DeletePostModal isOpen={isOpen} onClose={closeModal} onSubmit={handleDeletePost} />
    </div>
  )
}

export default memo(PostCard)
