'use client'

import Image from 'next/image'
import Link from 'next/link'

import PostCard from '@/views/chatroom/PostCard'
import { Button, Pagination } from '@nextui-org/react'
import { getImageAlt } from '@/utils/getImageAlt'
import { PostType } from '@/types/postType'

type RoomPageContentProps = {
  title: string
  icon: string
  category: string
  categoryBio: string
  postData: PostType[] | null
}

const RoomPageContent = ({ title, icon, category, categoryBio, postData }: RoomPageContentProps) => {
  return (
    <div className='md:w-[calc(100%-246px)]'>
      <div className='mb-4 flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <Image src={icon} alt={getImageAlt(icon) || ''} width={25} height={25} />
          <h1 className='md:text-xl font-bold'>{title}</h1>
        </div>
        <Link href='create'>
          <Button
            className='rounded-full'
            color='primary'
            startContent={
              <Image src='/images/icons/edit-white.svg' alt='edit-white' className='w-5 h-5' width={16} height={16} />
            }
          >
            投稿する
          </Button>
        </Link>
      </div>
      <div className='bg-bgSemiblue px-4 py-8 md:p-8 flex flex-col gap-6 rounded-2xl'>
        <h2 className='text-[32px] font-bold'>{category}</h2>
        <p>{categoryBio}</p>
        <div className='flex flex-col items-center sm:flex-row sm:flex-wrap gap-5'>
          {postData &&
            postData.map((post, index) => (
              <PostCard
                key={index}
                id={post.id}
                title={post.title}
                content={post.content}
                category_id={post.category_id}
                name={post.name}
                attachments={post.attachments}
                affiliation_name={post.affiliation_name}
                type_id={post.type_id}
                like_count={post.like_count}
                comment_count={post.comment_count}
                bookmark_flag={post.bookmark_flag}
                updated_at={post.updated_at}
              />
            ))}
        </div>
        {postData?.length && postData?.length > 3 && (
          <Pagination
            total={Math.round(postData?.length / 3)}
            initialPage={1}
            className='gap-2 m-auto'
            siblings={window.innerWidth > 425 ? 1 : 0}
            showControls
          />
        )}
      </div>
    </div>
  )
}

export default RoomPageContent
