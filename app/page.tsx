'use client'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Container from '@/components/layout/Container'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import SearchBar from '@/components/common/SearchBar'
import Button from '@/components/common/Button'
import Input from '@/components/form/InputText'
import PostCard from '@/views/chatroom/PostCard'
import DataLink from '@/components/common/DataLink'
import SectionTitle from '@/components/common/SectionTitle'
import AnnounceSmCard from '@/views/announce/AnnounceSmCard'
import TabVertical from '@/components/common/TabVertical'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper'

import roomData from '@/mockup/roomdata.json'
import { ROOM_CATEGORY } from '@/utils/constants'

export default function Home() {
  const searchParams = useSearchParams()
  const [roomCat, setRoomCat] = useState('1')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const roomCatQuery = searchParams.get('room_cat')
    if (roomCatQuery) {
      setRoomCat(roomCatQuery)
    }
  }, [searchParams])

  let roomListTitle = '',
    roomListHref = ''

  switch (roomCat) {
    case '1':
      roomListTitle = 'SH会トークルーム一覧へ'
      roomListHref = 'chatroom/sh-room'
      break
    case '2':
      roomListTitle = '仕事トークルーム一覧へ'
      roomListHref = 'chatroom/work-room'
      break
    case '3':
      roomListTitle = '交流トークルーム一覧へ'
      roomListHref = 'chatroom/exchange-room'
      break
    case '4':
      roomListTitle = '社長室トークルーム一覧へ'
      roomListHref = 'chatroom/boss-room'
      break
    default:
      break
  }

  return (
    <>
      <h1 className='text-center text-2xl font-bold hidden'>Security House</h1>
      <Breadcrumb />
      <SearchBar />
      <section className='bg-bgSemiblue py-8'>
        <Container>
          <SectionTitle title='トークルーム最新の投稿' icon='/images/talk-room.svg' />
          <div className='flex flex-col items-center mt-6 lg:flex-row lg:items-start'>
            <TabVertical queryKey='room_cat' roomCat={ROOM_CATEGORY}>
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
                  {roomData.map(room => (
                    <SwiperSlide key={room.id}>
                      <PostCard
                        id={room.id}
                        title={room.title}
                        description={room.description}
                        category={room.category}
                        tag={room.tag}
                        likeNum={room.likeNum}
                        commentNum={room.commentNum}
                        isLiked={room.isLiked}
                        user={room.user}
                        updatedAt={room.updatedAt}
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
                          src='/images/arrow-circle-left-outline.svg'
                          alt='arrow-left'
                          className='w-10 h-10'
                          width={40}
                          height={40}
                        />
                      </button>
                      <button className='arrow-right'>
                        <Image
                          src='/images/arrow-circle-right-outline.svg'
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
        <Container>
          <div className='flex flex-col gap-4 items-center md:flex-row md:items-start md:gap-[40px] xl:gap-[96px]'>
            <div className='flex flex-col justify-center items-start md:items-center gap-2 md:gap-6 w-full md:w-auto'>
              <SectionTitle title='新着情報' icon='/images/info-icon.svg' />
              <Button
                value='一覧を見る'
                onClick={() => {}}
                size='lg'
                subIcon='/images/arrow-circle-right-outline.svg'
                className='hidden md:block h-14 hrounded-full border border-primary'
              />
            </div>
            <div className='w-full md:hidden text-right'>
              <a href='#' className='underline font-bold'>
                一覧を見る
              </a>
            </div>
            <ul className='secondary-scroll flex flex-col items-center w-full h-[500px] md:h-[330px] overflow-y-scroll pr-6'>
              <AnnounceSmCard
                userName='山田太郎'
                userCompany='所属名'
                title='タイトルタイトルタイトル'
                description='投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ...'
                isBookmarked={false}
                onClickBookmark={() => {}}
                updatedAt='2024年6月11日 14:30'
              />
              <AnnounceSmCard
                userName='山田太郎'
                userCompany='所属名'
                title='タイトルタイトルタイトル'
                description='投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ...'
                isBookmarked={false}
                onClickBookmark={() => {}}
                updatedAt='2024年6月11日 14:30'
              />
              <AnnounceSmCard
                userName='山田太郎'
                userCompany='所属名'
                title='タイトルタイトルタイトル'
                description='投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ...'
                isBookmarked={false}
                onClickBookmark={() => {}}
                updatedAt='2024年6月11日 14:30'
              />
            </ul>
          </div>
        </Container>
      </section>
      <section className='bg-bgSemiblue py-12'>
        <Container>
          <SectionTitle title='資料集' icon='/images/data-icon.svg' />
          <div className='mt-6'>
            <h3>営業・事務</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-3'>
              <DataLink src='/images/note-icon.svg' title='チラシ・提案書' />
              <DataLink src='/images/video-icon.svg' title='動画' />
              <DataLink src='/images/pr-icon.svg' title='販促物' />
              <DataLink src='/images/doc-icon.svg' title='書類関係' />
            </div>
          </div>
          <div className='mt-6'>
            <h3>商品・技術</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-3'>
              <DataLink src='/images/brand-icon.svg' title='SHブランド' />
              <DataLink src='/images/takex-icon.svg' title='TAKEXブランド' />
              <DataLink src='/images/security-icon.svg' title='セキュリネット' />
              <DataLink src='/images/inext-icon.svg' title='i-NEXT' />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
