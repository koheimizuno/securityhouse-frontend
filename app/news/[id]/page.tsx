'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import Loading from '@/components/common/Loading'
import DeletePostModal from '@/components/modal/DeletePostModal'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'

import { NewsType } from '@/types/newsType'
import { getImageAlt } from '@/utils/getImageAlt'
import {
  deleteNewsBookmarkAction,
  deleteNewsLikeAction,
  getNewsByIdAction,
  newsBookmarkAction,
  newsLikeAction
} from '@/actions/newsAction'
import { deleteNewsAction } from '@/redux-store/slices/newsSlice'
import { getCategoryAction } from '@/redux-store/slices/categorySlice'
import { useAuthentication } from '@/hooks/AuthContext'
import { formatDate } from '@/utils/formatDate'

const NewDetailPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const [newData, setNewData] = useState<NewsType | null>(null)
  const { session_user_id } = useAuthentication()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openModal = () => setIsOpen(true)
  const closeModal = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (typeof id === 'string')
      getNewsByIdAction({ id: Number(id), user_id: session_user_id }).then(data => {
        setNewData(data)
      })
  }, [id, session_user_id])

  useEffect(() => {
    dispatch(
      getCategoryAction({
        pageFlag: '0',
        type_id: '5'
      })
    )
  }, [dispatch])

  const handleLike = () => {
    if (typeof id === 'string') {
      if (newData?.nice_flag) {
        deleteNewsLikeAction({ id: Number(id), user_id: session_user_id }).then(data => {
          setNewData(prevState => {
            if (prevState === null) return null
            else {
              return { ...prevState, like_count: data.like_count, nice_flag: data.like_status }
            }
          })
        })
      } else {
        newsLikeAction({ id: Number(id), user_id: session_user_id }).then(data => {
          setNewData(prevState => {
            if (prevState === null) return null
            else {
              return { ...prevState, like_count: data.like_count, nice_flag: data.like_status }
            }
          })
        })
      }
    }
  }

  const handleBookmark = () => {
    if (typeof id === 'string') {
      if (newData?.bookmark_flag) {
        deleteNewsBookmarkAction({ id: Number(id), user_id: session_user_id }).then(data => {
          setNewData(prevState => {
            if (prevState !== null) {
              return { ...prevState, bookmark_flag: data }
            } else {
              return null
            }
          })
        })
      } else {
        newsBookmarkAction({ id: Number(id), user_id: session_user_id }).then(data => {
          setNewData(prevState => {
            if (prevState !== null) {
              return { ...prevState, bookmark_flag: data }
            } else {
              return null
            }
          })
        })
      }
    }
  }

  const handleDeletePost = useCallback(async () => {
    await dispatch(deleteNewsAction(id))
    closeModal()
    setTimeout(() => {
      router.push('/news')
    }, 2000)
  }, [dispatch, router, id, closeModal])

  if (!newData) {
    return <Loading flag='1' />
  }

  return (
    <Container className='py-12 flex flex-col gap-8'>
      <PageHeader title='お知らせ詳細' subtitle='お知らせ' />
      <div className='flex flex-col gap-4 md:gap-8 bg-bgSemiblue px-6  md:px-16 py-10 rounded-2xl'>
        <Button size='sm' color='primary' disabled className='md:hidden text-xs px-2 py-0 h-6 rounded-full w-fit'>
          {newData.category_name && newData.category_name}
        </Button>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row items-center gap-6'>
            <div className='flex items-center gap-2 mt-4 mb-3 text-sm md:text-base'>
              <Image src={newData.thumbnail} alt={getImageAlt(newData.thumbnail) || ''} width={44} height={44} />
              <div>
                <p className='text-sm'>
                  {newData.name}／{newData.affiliation_name}
                </p>
                <p>{formatDate(newData.created_at)}</p>
              </div>
            </div>
            <Button
              size='sm'
              color='primary'
              disabled
              className='hidden md:block text-xs px-2 py-0 h-6 rounded-full w-fit'
            >
              {newData.category_name && newData.category_name}
            </Button>
          </div>
          {newData.user_id === session_user_id && (
            <Dropdown>
              <DropdownTrigger className='cursor-pointer'>
                <Image src='/images/icons/more-icon.svg' alt='more-icon' width={32} height={32} />
              </DropdownTrigger>
              <DropdownMenu aria-label='Static Actions'>
                <DropdownItem key='edit'>
                  <Link href={`/news/edit/${id}`}>編集する</Link>
                </DropdownItem>
                <DropdownItem key='delete' className='text-danger' color='danger' onClick={openModal}>
                  削除する
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
        <h3 className='text-xl font-bold truncate text-txtColor'>{newData?.title}</h3>
        <p>{newData?.content}</p>
        <Image
          src={`${newData.attachment}`}
          alt={getImageAlt(newData.attachment) || ''}
          className='w-full h-auto max-h-[300px]'
          width={40}
          height={40}
        />
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Image
              src={`${newData.nice_flag ? '/images/icons/thumb-up-fill.svg' : '/images/icons/thumb-up-outline.svg'}`}
              alt='thumb-up'
              width={25}
              height={25}
            />
            <p className='text-sm font-bold'>
              <button className='underline' onClick={handleLike}>
                いいね！{' '}
              </button>
              <span className='ms-2'>{newData.like_count}件</span>
            </p>
          </div>
          <button onClick={handleBookmark}>
            <Image
              src={newData.bookmark_flag ? '/images/icons/bookmark-fill.svg' : '/images/icons/bookmark-icon-black.svg'}
              alt={newData.bookmark_flag ? 'bookmark-fill.svg' : 'bookmark-icon-black.svg'}
              className='w-8 h-8'
              width={32}
              height={32}
            />
          </button>
        </div>
      </div>
      <DeletePostModal isOpen={isOpen} onClose={closeModal} onSubmit={handleDeletePost} />
    </Container>
  )
}

export default NewDetailPage
