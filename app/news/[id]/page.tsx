'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import Breadcrumb from '@/components/breadcrumb'
import SearchBar from '@/components/common/SearchBar'
import Loading from '@/components/common/Loading'
import DeletePostModal from '@/components/modal/DeletePostModal'
import { Button } from '@nextui-org/react'

import { NewsType } from '@/types/newsType'
import { useClickAway } from '@uidotdev/usehooks'
import { getImageAlt } from '@/utils/getImageAlt'
import { getNewsByIdAction } from '@/actions/newsAction'
import { deleteNewsAction } from '@/redux-store/slices/newsSlice'
import { getCategoryAction } from '@/redux-store/slices/categorySlice'
import { RootState } from '@/redux-store'
import { CategoryType } from '@/types/categoryType'

const NewDetail = () => {
  const { id } = useParams()
  const pathname = usePathname()
  const dispatch = useDispatch()
  const [newData, setNewData] = useState<NewsType | null>(null)
  const [moreActive, setMoreActive] = useState<boolean>(false)
  const { categories } = useSelector((state: RootState) => state.category)

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openModal = () => setIsOpen(true)
  const closeModal = useCallback(() => setIsOpen(false), [])

  const ref = useClickAway<HTMLDivElement>(() => {
    setMoreActive(false)
  })

  const category = useMemo(() => {
    return categories?.find((category: CategoryType) => category.id === newData?.category_id)?.title || ''
  }, [categories, newData?.category_id])

  useEffect(() => {
    if (typeof id === 'string')
      getNewsByIdAction(id).then(data => {
        setNewData(data)
      })
  }, [id])

  useEffect(() => {
    dispatch(
      getCategoryAction({
        pageFlag: '0',
        type_id: '5'
      })
    )
  }, [dispatch])

  const handleLike = () => {}
  const handleBookmark = () => {}

  const handleDeletePost = useCallback(async () => {
    await dispatch(deleteNewsAction(id))
    setMoreActive(false)
  }, [dispatch, id])

  if (!newData) {
    return <Loading flag='1' />
  }

  console.log(newData)

  return (
    <>
      <Breadcrumb />
      <SearchBar />
      <Container className='py-12'>
        <PageHeader title='お知らせ' />
        <div className='mt-5 flex flex-col gap-4 md:gap-8 bg-bgSemiblue px-6  md:px-16 py-10 rounded-2xl'>
          <Button size='sm' color='primary' disabled className='md:hidden text-xs px-2 py-0 h-6 rounded-full w-fit'>
            {category && category}
          </Button>
          <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-row items-center gap-6'>
              <div className='flex items-center gap-2 mt-4 mb-3 text-sm md:text-base'>
                <Image src='/images/icons/user-icon00.svg' alt='user-icon00 w-11 h-11' width={44} height={44} />
                <div>
                  <p className='text-sm'>
                    {newData.name}／{newData.affiliation_name}
                  </p>
                  <p>{'0000年00月00日00:00'}</p>
                </div>
              </div>
              <Button
                size='sm'
                color='primary'
                disabled
                className='hidden md:block text-xs px-2 py-0 h-6 rounded-full w-fit'
              >
                {category && category}
              </Button>
            </div>
            <div ref={ref} className='relative'>
              <button onClick={() => pathname !== '/' && setMoreActive(!moreActive)}>
                <Image src='/images/icons/more-icon.svg' alt='more-icon' width={32} height={32} />
              </button>
              {moreActive && (
                <ul className='bg-white absolute z-10 top-4 right-4 lg:left-4 w-[150px] flex flex-col shadow-md rounded-md'>
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
          <h3 className='text-xl font-bold truncate text-txtColor'>{newData?.title}</h3>
          <p>{newData?.content}</p>
          <Image
            src={`/${newData.notice_attachments || '/image/post-thumnail-sample.png'}`}
            alt={getImageAlt(newData.notice_attachments) || 'new-thumnail-sample'}
            className='w-full h-auto max-h-[300px]'
            width={40}
            height={40}
          />
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <Image src='/images/icons/thumbs-up-black.svg' alt='thumbs-up' width={20} height={20} />
              <p className='text-sm font-bold'>
                <button className='underline' onClick={handleLike}>
                  いいね！{' '}
                </button>
                <span className='ms-2'>{'0'}件</span>
              </p>
            </div>
            <button onClick={handleBookmark}>
              <Image
                src={
                  newData.bookmark_flag === '1'
                    ? '/images/icons/bookmark-fill.svg'
                    : '/images/icons/bookmark-icon-black.svg'
                }
                alt={newData.bookmark_flag === '1' ? 'bookmark-fill.svg' : 'bookmark-icon-black.svg'}
                className='w-8 h-8'
                width={32}
                height={32}
              />
            </button>
          </div>
        </div>
        <DeletePostModal isOpen={isOpen} onClose={closeModal} onSubmit={handleDeletePost} />
      </Container>
    </>
  )
}

export default NewDetail
