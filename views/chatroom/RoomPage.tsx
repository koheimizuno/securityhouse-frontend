/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'

import Container from '@/components/layout/Container'
import Category from '@/components/common/Category'

import { getCategoryAction } from '@/redux-store/slices/categorySlice'
import { getPostTypeAction } from '@/redux-store/slices/postTypeSlice'
import { RootState } from '@/redux-store'
import { RoomContext } from '@/hooks/RoomContext'

const RoomPage = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const dispatch = useDispatch()
  const { categories } = useSelector((state: RootState) => state.category)
  const { postTypes } = useSelector((state: RootState) => state.post_type)

  const postType = useMemo(() => {
    if (pathname.includes('sh-room')) return '1'
    if (pathname.includes('work-room')) return '2'
    if (pathname.includes('exchange-room')) return '3'
    if (pathname.includes('boss-room')) return '4'
  }, [pathname])

  useEffect(() => {
    dispatch(getPostTypeAction())
  }, [dispatch])

  useEffect(() => {
    dispatch(
      getCategoryAction({
        pageFlag: '0',
        type_id: postType
      })
    )
  }, [dispatch, postType])

  const handleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <RoomContext.Provider value={{ categories: categories, postTypes: postTypes }}>
      <Container className='py-12'>
        <div className={`inline-block md:hidden ${isOpen && 'change'}`} onClick={handleMenu}>
          <div className='bar1'></div>
          <div className='bar2'></div>
          <div className='bar3'></div>
        </div>
        <div className='relative py-4 flex items-start gap-10'>
          <div
            className={`absolute top-0 left-0 z-10 h-full bg-white shadow-xl rounded-lg md:p-0 md:shadow-none md:relative overflow-hidden ${
              isOpen ? 'max-w-full px-4 py-6 border border-colorGray1 md:border-none' : 'max-w-0 md:max-w-none'
            }`}
          >
            <Category categories={categories} toggleMenu={handleMenu} />
          </div>
          {children}
        </div>
      </Container>
    </RoomContext.Provider>
  )
}

export default RoomPage
