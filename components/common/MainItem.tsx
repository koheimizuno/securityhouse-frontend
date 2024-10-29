'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@nextui-org/react'

import { getImageAlt } from '@/utils/getImageAlt'
import { PostType } from '@/types/postType'
import { useClickAway } from '@uidotdev/usehooks'
import DeletePostModal from '../modal/DeletePostModal'
import { deleteNewsAction } from '@/redux-store/slices/newsSlice'
import { NewsType } from '@/types/newsType'

const PostItem = ({
  id,
  title,
  content,
  name,
  affiliation_name,
  thumbnail,
  bookmark_flag,
  updated_at
}: Partial<PostType | NewsType>) => {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const [moreActive, setMoreActive] = useState<boolean>(false)
  const [contentMore, setContentMore] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openModal = () => setIsOpen(true)
  const closeModal = useCallback(() => setIsOpen(false), [])

  const ref = useClickAway<HTMLDivElement>(() => {
    setMoreActive(false)
  })

  const newsFlag = useMemo(() => {
    return pathname.includes('news') ? true : false
  }, [pathname])

  const imgData = useMemo(() => {
    if (thumbnail) {
      return { src: thumbnail, alt: getImageAlt(thumbnail) }
    } else {
      return { src: '/images/icons/user-icon00.svg', alt: getImageAlt('/images/icons/user-icon00.svg') }
    }
  }, [thumbnail])

  const handleDeletePost = useCallback(async () => {
    await dispatch(deleteNewsAction(id))
    setMoreActive(false)
    closeModal()
  }, [dispatch, id, closeModal])

  return (
    <li
      className={`${
        newsFlag ? 'bg-white' : ''
      } flex flex-col gap-5 border border-colorGray2 rounded-2xl px-6 md:px-9 py-6 w-full shadow-md`}
    >
      <div>
        <Button size='sm' color='primary' className='md:hidden rounded-full text-xs px-2 py-0 h-6'>
          事務局からのご案内
        </Button>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4 md:gap-8'>
          <Image src={imgData.src} alt={imgData.alt || ''} width={44} height={44} />
          <div className='flex flex-col gap-1'>
            <p className='text-[15px]'>
              {name}/{affiliation_name}
            </p>
            <p className='text-xs text-colorGray3'>{(updated_at && updated_at) || ''}</p>
          </div>
          <Button size='sm' color='primary' className='hidden md:block rounded-full text-xs px-2 py-0 h-6'>
            事務局からのご案内
          </Button>
        </div>
        <div ref={ref} className='relative'>
          <button onClick={() => pathname !== '/' && setMoreActive(!moreActive)}>
            <Image src='/images/icons/more-vertical.svg' alt='more-vertical' width={20} height={20} />
          </button>
          {moreActive && (
            <ul className='bg-white absolute z-10 top-4 right-4 xl:left-4 w-[150px] flex flex-col shadow-md rounded-md'>
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
      <Link href={`/${newsFlag ? 'news' : 'chatroom/post'}/${id}`}>
        <h3 className='underline'>{title}</h3>
      </Link>
      <p className={`text-sm ${!contentMore && 'line-clamp-2'}`}>{content}</p>
      <button className='text-left text-[15px] text-colorGray3' onClick={() => setContentMore(prevState => !prevState)}>
        {!contentMore ? '…もっと見る' : '…表示を少なくする'}
      </button>
      <div className='mt-4 flex items-center gap-2'>
        <div className='flex items-center gap-2'>
          <Image src='/images/icons/thumbs-up.svg' alt='thumb-up' width={20} height={20} />
          <span>44</span>
        </div>
        <Image
          src={bookmark_flag === '1' ? '/images/icons/bookmark-fill.svg' : '/images/icons/bookmark-outline.svg'}
          alt={bookmark_flag === '1' ? 'bookmark-fill' : 'bookmark-outline'}
          width={32}
          height={32}
        />
      </div>
      <DeletePostModal isOpen={isOpen} onClose={closeModal} onSubmit={handleDeletePost} />
    </li>
  )
}

export default PostItem
