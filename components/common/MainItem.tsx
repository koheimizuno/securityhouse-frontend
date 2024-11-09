'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@nextui-org/react'
import DeletePostModal from '@/components/modal/DeletePostModal'

import { getImageAlt } from '@/utils/getImageAlt'
import { formatDate } from '@/utils/formatDate'
import { useClickAway } from '@uidotdev/usehooks'
import { PostType } from '@/types/postType'
import { NewsType } from '@/types/newsType'
import { deleteNewsAction } from '@/redux-store/slices/newsSlice'
import { deletePostAction } from '@/redux-store/slices/postSlice'
import {
  deleteNewsBookmarkAction,
  deleteNewsLikeAction,
  newsBookmarkAction,
  newsLikeAction
} from '@/actions/newsAction'
import { useAuthentication } from '@/hooks/AuthContext'
import {
  deletePostBookmarkAction,
  deletePostLikeAction,
  postBookmarkAction,
  postLikeAction
} from '@/actions/postAction'

const MainItem = ({
  id,
  title,
  content,
  category_name,
  user_name,
  affiliation_name,
  thumbnail,
  nice_flag,
  like_count,
  bookmark_flag,
  created_at
}: Partial<PostType | NewsType>) => {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch()
  const contentRef = useRef<HTMLParagraphElement | null>(null)
  const [moreActive, setMoreActive] = useState<boolean>(false)
  const [contentHeight, setContentHeight] = useState<number>(0)
  const [contentMore, setContentMore] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [niceObj, setNiceObj] = useState({
    flag: nice_flag,
    count: like_count
  })
  const [bookmark, setBookmark] = useState(bookmark_flag)
  const { session_user_id } = useAuthentication()

  const openModal = () => setIsOpen(true)
  const closeModal = useCallback(() => setIsOpen(false), [])

  const ref = useClickAway<HTMLDivElement>(() => {
    setMoreActive(false)
  })

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight)
    }
  }, [])

  const newsFlag = useMemo(() => {
    return pathname.includes('news') ? true : false
  }, [pathname])

  const imgData = useMemo(() => {
    if (thumbnail) {
      return { src: '/' + thumbnail, alt: getImageAlt(thumbnail) }
    } else {
      return { src: '/images/icons/user-icon00.svg', alt: getImageAlt('/images/icons/user-icon00.svg') }
    }
  }, [thumbnail])

  const handleDeletePost = useCallback(async () => {
    await dispatch(deletePostAction(id))
    setMoreActive(false)
    closeModal()
    setTimeout(() => {
      router.push('/chatroom/sh-room/')
    }, 2000)
  }, [dispatch, id, closeModal, router])

  const handleDeleteNew = useCallback(async () => {
    await dispatch(deleteNewsAction(id))
    setMoreActive(false)
    closeModal()
  }, [dispatch, id, closeModal])

  const handleLikePost = () => {
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

  const handleLikeNew = () => {
    if (niceObj.flag) {
      if (id)
        deleteNewsLikeAction({ id, user_id: session_user_id }).then(data =>
          setNiceObj(prevState => ({ ...prevState, flag: data.like_status, count: data.like_count }))
        )
    } else {
      if (id)
        newsLikeAction({ id, user_id: session_user_id }).then(data =>
          setNiceObj(prevState => ({ ...prevState, flag: data.like_status, count: data.like_count }))
        )
    }
  }

  const handleBookmarkPost = () => {
    if (bookmark) {
      if (id) deletePostBookmarkAction({ post_id: id, user_id: session_user_id }).then(data => setBookmark(data))
    } else {
      if (id) postBookmarkAction({ post_id: id, user_id: session_user_id }).then(data => setBookmark(data))
    }
  }

  const handleBookmarkNews = () => {
    if (bookmark) {
      if (id) deleteNewsBookmarkAction({ id, user_id: session_user_id }).then(data => setBookmark(data))
    } else {
      if (id) newsBookmarkAction({ id, user_id: session_user_id }).then(data => setBookmark(data))
    }
  }

  return (
    <li
      className={`${
        newsFlag ? 'bg-white' : ''
      } flex flex-col gap-5 border border-colorGray2 rounded-2xl px-6 md:px-9 py-6 w-full shadow-md`}
    >
      <div>
        <Button size='sm' color='primary' className='md:hidden rounded-full text-xs px-2 py-0 h-6'>
          {category_name}
        </Button>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4 md:gap-8'>
          <Image src={imgData.src} alt={imgData.alt || ''} width={44} height={44} />
          <div className='flex flex-col gap-1'>
            <p className='text-[15px]'>
              {user_name}/{affiliation_name}
            </p>
            {created_at && <p className='text-xs text-colorGray3'>{formatDate(created_at)}</p>}
          </div>
          <Button size='sm' color='primary' className='hidden md:block rounded-full text-xs px-2 py-0 h-6'>
            {category_name}
          </Button>
        </div>
        <div ref={ref} className='relative'>
          <button onClick={() => pathname !== '/' && setMoreActive(!moreActive)}>
            <Image src='/images/icons/more-vertical.svg' alt='more-vertical' width={20} height={20} />
          </button>
          {moreActive && (
            <ul className='bg-white absolute z-10 top-4 right-4 xl:left-4 w-[150px] flex flex-col shadow-md rounded-md'>
              <li className='px-6 py-2 rounded-md hover:bg-colorGray1'>
                <Link href={`${newsFlag ? `/news/${id}` : `/chatroom/post/edit/${id}`}`}>編集する</Link>
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
      <p ref={contentRef} className={`text-sm ${contentHeight > 40 ? !contentMore && 'line-clamp-2' : ''}`}>
        {content}
      </p>
      {contentHeight > 40 && (
        <button
          className='text-left text-[15px] text-colorGray3'
          onClick={() => setContentMore(prevState => !prevState)}
        >
          {!contentMore ? '…もっと見る' : '…表示を少なくする'}
        </button>
      )}
      <div className='mt-4 flex items-center gap-2'>
        <div className='flex items-center gap-1'>
          <Image
            src={`${niceObj.flag ? '/images/icons/thumb-up-fill.svg' : '/images/icons/thumb-up-outline.svg'}`}
            alt='thumb-up'
            width={25}
            height={25}
          />
          <p className='text-sm font-bold text-colorGray4 flex items-center gap-1'>
            <button className='underline' onClick={newsFlag ? handleLikeNew : handleLikePost}>
              いいね！{' '}
            </button>
            <span>{niceObj.count}件</span>
          </p>
        </div>
        <button onClick={newsFlag ? handleBookmarkNews : handleBookmarkPost}>
          <Image
            src={bookmark ? '/images/icons/bookmark-fill.svg' : '/images/icons/bookmark-outline.svg'}
            alt={bookmark ? 'bookmark-fill' : 'bookmark-outline'}
            width={32}
            height={32}
          />
        </button>
      </div>
      <DeletePostModal isOpen={isOpen} onClose={closeModal} onSubmit={newsFlag ? handleDeleteNew : handleDeletePost} />
    </li>
  )
}

export default MainItem
