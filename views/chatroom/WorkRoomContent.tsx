'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import PostCard from '@/views/chatroom/PostCard'
import { Pagination } from '@nextui-org/react'

import postdata from '@/mockup/postdata.json'

const WorkRoomContent = () => {
  const pathname = usePathname()

  return (
    <div className='w-[calc(100%-246px)]'>
      <div className='flex items-center gap-3 mb-4'>
        <Image src='/images/sh-room-primary.svg' alt='sh-room-primary' width={25} height={25} />
        <h1 className='text-xl font-bold'>仕事トークルーム</h1>
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

export default WorkRoomContent
