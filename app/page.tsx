'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import NewsSection from '@/views/top/NewsSection'
import PostCard from '@/views/chatroom/PostCard'
import DocumentSection from '@/views/top/DocumentSection'
import Container from '@/components/layout/Container'
import SectionTitle from '@/components/common/SectionTitle'
import TabVertical from '@/components/common/TabVertical'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'

import { POST_TYPE } from '@/utils/constants'
import { getPostsAction } from '@/actions/postAction'
import { PostType } from '@/types/postType'
import { getCategoryAction } from '@/redux-store/slices/categorySlice'
import { getPostTypeAction } from '@/redux-store/slices/postTypeSlice'
import { RootState } from '@/redux-store'
import { useAuthentication } from '@/hooks/AuthContext'

export default function Home() {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const [postType, setPostType] = useState('1')
  const [posts, setPosts] = useState<PostType[]>([])
  const [progress, setProgress] = useState(0)
  const { user_id } = useAuthentication()
  const { categories } = useSelector((state: RootState) => state.category)

  useEffect(() => {
    const postTypeQuery = searchParams.get('type_id')
    if (postTypeQuery) {
      setPostType(postTypeQuery)
    }
  }, [searchParams])

  useEffect(() => {
    dispatch(getPostTypeAction())
  }, [dispatch])

  useEffect(() => {
    getPostsAction({ user_id, type_id: postType })
      .then(data => {
        setPosts(data)
      })
      .catch(err => {
        console.error(err)
      })
    dispatch(
      getCategoryAction({
        pageFlag: '0',
        type_id: postType
      })
    )
  }, [dispatch, postType, user_id])

  const { roomListTitle, roomListHref } = useMemo(() => {
    switch (postType) {
      case '1':
        return { roomListTitle: 'SH会トークルーム一覧へ', roomListHref: 'chatroom/sh-room' }
      case '2':
        return { roomListTitle: '仕事トークルーム一覧へ', roomListHref: 'chatroom/work-room' }
      case '3':
        return { roomListTitle: '交流トークルーム一覧へ', roomListHref: 'chatroom/exchange-room' }
      case '4':
        return { roomListTitle: '社長室トークルーム一覧へ', roomListHref: 'chatroom/boss-room' }
      default:
        return { roomListTitle: '', roomListHref: '' }
    }
  }, [postType])

  return (
    <>
      <section className='bg-bgSemiblue py-8'>
        <Container>
          <SectionTitle title='トークルーム最新の投稿' icon='/images/icons/talk-room.svg' />
          <div className='flex flex-col items-center mt-6 lg:flex-row lg:items-start'>
            <TabVertical queryKey='type_id' menuList={POST_TYPE}>
              <div className='w-full lg:w-[calc(100%-240px)] bg-primary py-7 px-4 lg:ps-10 shadow-lg rounded-xl rounded-tl-none'>
                <div className='text-right pe-8 mb-6'>
                  <Link href={roomListHref} className='text-white font-bold'>
                    {roomListTitle}
                  </Link>
                </div>
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                  speed={800}
                  centeredSlides
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                  }}
                  spaceBetween={16}
                  slidesPerView={1}
                  breakpoints={{
                    640: {
                      slidesPerView: 2
                    },
                    1024: {
                      slidesPerView: 3
                    }
                  }}
                  navigation={{
                    nextEl: '.arrow-right',
                    prevEl: '.arrow-left'
                  }}
                  onSwiper={(swiper: SwiperType) => {
                    swiper.on('progress', (swiper: SwiperType) => {
                      setProgress(swiper.progress * 100)
                    })
                  }}
                >
                  {posts &&
                    categories &&
                    posts.map((post, index) => (
                      <SwiperSlide key={index}>
                        <PostCard
                          id={post.id}
                          title={post.title}
                          content={post.content}
                          category_name={post.category_name}
                          name={post.name}
                          affiliation_name={post.affiliation_name}
                          thumbnail={post.thumbnail}
                          type_id={post.type_id}
                          nice_flag={post.nice_flag}
                          like_count={post.like_count}
                          comment_count={post.comment_count}
                          bookmark_flag={post.bookmark_flag}
                          updated_at={post.updated_at}
                        />
                      </SwiperSlide>
                    ))}

                  <div className='flex justify-end items-center gap-4 mt-4 md:mt-5 md:mr-4'>
                    <div className='w-full h-3 bg-white rounded-full p-[2px]'>
                      <div
                        className='h-full bg-secondary rounded-full transition-all duration-300 ease-linear'
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className='flex items-center gap-2 md:gap-4'>
                      <button className='arrow-left'>
                        <Image
                          src='/images/icons/arrow-circle-left-outline.svg'
                          alt='arrow-left'
                          className='w-10 h-10'
                          width={40}
                          height={40}
                        />
                      </button>
                      <button className='arrow-right'>
                        <Image
                          src='/images/icons/arrow-circle-right-outline.svg'
                          alt='arrow-right'
                          className='w-10 h-10'
                          width={40}
                          height={40}
                        />
                      </button>
                    </div>
                  </div>
                </Swiper>
              </div>
            </TabVertical>
          </div>
        </Container>
      </section>
      <section className='py-12'>
        <NewsSection />
      </section>
      <section className='bg-bgSemiblue py-12'>
        <DocumentSection />
      </section>
    </>
  )
}
