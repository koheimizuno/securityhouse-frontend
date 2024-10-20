'use client'

import Image from 'next/image'
import Link from 'next/link'

import PostCard from '@/views/chatroom/PostCard'
import Button from '@/components/common/Button'
import { Pagination } from '@nextui-org/react'

import postdata from '@/mockup/postdata.json'

const SHRoomContent = () => {
  return (
    <div className='md:w-[calc(100%-246px)]'>
      <div className='mb-4 flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <Image src='/images/sh-room-primary.svg' alt='sh-room-primary' width={25} height={25} />
          <h1 className='md:text-xl font-bold'>SH会トークルーム</h1>
        </div>
        <Link href='create'>
          <Button icon='/images/edit-white.svg' className='rounded-md' value='投稿する' />
        </Link>
      </div>
      <div className='bg-bgSemiblue px-4 py-8 md:p-8 flex flex-col gap-6 rounded-2xl'>
        <h2 className='text-[32px] font-bold'>すべて</h2>
        <p>
          カテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入ります
        </p>
        <div className='flex flex-col items-center sm:flex-row sm:flex-wrap gap-5'>
          {postdata.map((post, index) => (
            <PostCard
              key={index}
              id={post.id}
              title={post.title}
              description={post.description}
              category={post.category}
              tag={post.tag}
              likeNum={post.likeNum}
              commentNum={post.commentNum}
              isLiked={post.isLiked}
              user={post.user}
              updatedAt={post.updatedAt}
            />
          ))}
        </div>
        <Pagination total={10} initialPage={1} className='gap-2 m-auto' showControls />
      </div>
    </div>
  )
}

export default SHRoomContent
