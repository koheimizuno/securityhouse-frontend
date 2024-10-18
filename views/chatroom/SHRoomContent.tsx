'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

import PostCard from '@/views/chatroom/PostCard'
import Pagination from '@/views/chatroom/Pagination'
import Button from '@/components/common/Button'

import postdata from '@/mockup/postdata.json'
import Link from 'next/link'

const SHRoomContent = () => {
  const pathname = usePathname()

  return (
    <div className='w-[calc(100%-246px)]'>
      <div className='mb-4 flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <Image src='/images/sh-room-primary.svg' alt='sh-room-primary' width={25} height={25} />
          <h1 className='text-xl font-bold'>SH会トークルーム</h1>
        </div>
        <Link href='create'>
          <Button icon='/images/edit-white.svg' className='rounded-md' value='投稿する' />
        </Link>
      </div>
      <div className='bg-bgSemiblue p-8 flex flex-col gap-6 rounded-2xl'>
        <h2 className='text-[32px] font-bold'>すべて</h2>
        <p>
          カテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入ります
        </p>
        <div className='flex flex-wrap gap-5'>
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
        <Pagination currentPage={2} perPage={3} totalItems={30} baseUrl={pathname} />
      </div>
    </div>
  )
}

export default SHRoomContent
