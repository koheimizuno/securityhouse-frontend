'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import PostCard from '@/views/chatroom/PostCard'
import Pagination from '@/views/chatroom/Pagination'

import roomData from '@/mockup/roomdata.json'

const BossRoomContent = () => {
  const pathname = usePathname()
  return (
    <div className='w-[calc(100%-246px)]'>
      <div className='flex items-center gap-3 mb-4'>
        <Image src='/images/sh-room-primary.svg' alt='sh-room-primary' width={25} height={25} />
        <h1 className='text-xl font-bold'>社長室トークルーム</h1>
      </div>
      <div className='bg-bgSemiblue p-8 flex flex-col gap-6 rounded-2xl'>
        <h2 className='text-[32px] font-bold'>すべて</h2>
        <p>
          カテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入ります
        </p>
        <div className='flex flex-wrap gap-5'>
          {roomData.map((room, index) => (
            <PostCard
              key={index}
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
          ))}
        </div>
        <Pagination currentPage={2} perPage={3} totalItems={30} baseUrl={pathname} />
      </div>
    </div>
  )
}

export default BossRoomContent
