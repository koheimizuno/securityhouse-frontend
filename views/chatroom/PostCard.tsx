'use client'

import React, { memo, useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'

import { formatDate } from '@/utils/formatDate'
import { deletePostAction, postReportAction } from '@/redux-store/slices/postSlice'
import { PostType } from '@/types/postType'
import DeletePostModal from '@/components/modal/DeletePostModal'
import getPostTypeById from '@/utils/getPostTypeByID'
import { getImageAlt } from '@/utils/getImageAlt'
import { useAuthentication } from '@/hooks/AuthContext'
import {
  deletePostBookmarkAction,
  deletePostLikeAction,
  postBookmarkAction,
  postLikeAction
} from '@/actions/postAction'

const PostCard = ({
  id,
  title,
  content,
  category_name,
  user_id,
  name,
  affiliation_name,
  thumbnail,
  type_id,
  nice_flag,
  like_count,
  comment_count,
  bookmark_flag,
  created_at
}: Partial<PostType>) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [niceObj, setNiceObj] = useState({
    flag: nice_flag,
    count: like_count
  })
  const [bookmark, setBookmark] = useState(bookmark_flag)
  const { session_user_id } = useAuthentication()

  const openModal = () => setIsOpen(true)
  const closeModal = useCallback(() => setIsOpen(false), [])

  const imgData = useMemo(() => {
    if (thumbnail) {
      return { src: '/' + thumbnail, alt: getImageAlt(thumbnail) }
    } else {
      return { src: '/images/icons/user-icon00.svg', alt: getImageAlt('/images/icons/user-icon00.svg') }
    }
  }, [thumbnail])

  const handleDeletePost = useCallback(async () => {
    await dispatch(deletePostAction(id))
    closeModal()
  }, [dispatch, id, closeModal])

  const handleLike = () => {
    if (niceObj.flag) {
      if (id)
        deletePostLikeAction({ id, user_id: session_user_id }).then(data =>
          setNiceObj(prevState => ({ ...prevState, flag: data.like_status, count: data.like_count }))
        )
    } else {
      if (id)
        postLikeAction({ id, user_id: session_user_id }).then(data =>
          setNiceObj(prevState => ({ ...prevState, flag: data.like_status, count: data.like_count }))
        )
    }
  }

  const handleBookmark = () => {
    if (bookmark) {
      if (id) deletePostBookmarkAction({ post_id: id, user_id: session_user_id }).then(data => setBookmark(data))
    } else {
      if (id) postBookmarkAction({ post_id: id, user_id: session_user_id }).then(data => setBookmark(data))
    }
  }

  const handleReport = async () => {
    await dispatch(postReportAction(id))
  }

  return (
    <div className='relative bg-white px-4 py-6 w-[282px] rounded-md'>
      <button onClick={handleBookmark}>
        <Image
          src={bookmark ? '/images/icons/bookmark-fill.svg' : '/images/icons/bookmark-fill-gray.svg'}
          alt={bookmark ? 'bookmark-on' : 'bookmark-off'}
          className='absolute -top-1 right-3 w-8 h-8'
          width={32}
          height={32}
        />
      </button>
      <p className='text-xs flex items-center gap-1 mb-3'>
        <span className='text-primary'>■</span>
        {type_id && <span>{getPostTypeById(type_id).title}</span>}
      </p>
      <div className='mb-5 flex items-center flex-wrap gap-2'>
        <Button size='sm' color='primary' className='text-xs px-2 py-0 h-6 rounded-full w-fit'>
          {category_name}
        </Button>
      </div>
      <Link href={`/chatroom/post/${id}`}>
        <h3 className='underline truncate text-txtColor'>{title}</h3>
      </Link>
      <p className='text-sm truncate'>{content}</p>
      <div className='grid grid-cols-2 gap-4 mt-[22px] mb-4'>
        <div className='flex items-center gap-1'>
          <Image
            src={`${niceObj.flag ? '/images/icons/thumb-up-fill.svg' : '/images/icons/thumb-up-outline.svg'}`}
            alt='thumb-up'
            width={20}
            height={20}
          />
          <p className='text-sm font-bold text-colorGray4 flex items-center gap-1'>
            <button className='underline' onClick={handleLike}>
              いいね！{' '}
            </button>
            <span>{niceObj.count}件</span>
          </p>
        </div>
        <div className='flex items-center gap-1'>
          <Image src='/images/icons/comment-icon.svg' alt='comment' className='w-5 h-5' width={20} height={20} />
          <p className='text-sm font-bold text-colorGray4 flex items-center gap-1'>
            <span>コメント </span>
            <span>{comment_count}件</span>
          </p>
        </div>
      </div>
      <hr className='border-b border-colorGray4' />
      <div className='flex items-center gap-2 mt-4 mb-3'>
        <Image src={imgData.src} alt={imgData.alt || ''} width={24} height={24} />
        <p className='text-sm'>
          {name}/{affiliation_name}
        </p>
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-colorGray4'>{created_at && formatDate(created_at)}</p>
        <Dropdown placement='bottom-end'>
          <DropdownTrigger className='cursor-pointer'>
            <Image src='/images/icons/more-icon.svg' alt='more-icon' width={32} height={32} />
          </DropdownTrigger>
          {user_id === session_user_id ? (
            <DropdownMenu aria-label='Static Actions'>
              <DropdownItem key='edit'>
                <Link href={`/chatroom/post/edit/${id}`}>編集する</Link>
              </DropdownItem>
              <DropdownItem key='delete' className='text-danger' color='danger' onClick={openModal}>
                削除する
              </DropdownItem>
            </DropdownMenu>
          ) : (
            <DropdownMenu aria-label='Static Actions'>
              <DropdownItem key='report' onClick={handleReport}>
                通報する
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
      </div>
      <DeletePostModal isOpen={isOpen} onClose={closeModal} onSubmit={handleDeletePost} />
    </div>
  )
}

export default memo(PostCard)
