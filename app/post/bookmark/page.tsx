'use client'

import React, { useEffect, useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import PostItem from '@/views/chatroom/PostItem'
import { getBookmarkedPostAction } from '@/actions/postAction'
import { PostType } from '@/types/postType'

const BookmarkedPost = () => {
  const [postData, setPostData] = useState<PostType[] | null>(null)

  useEffect(() => {
    getBookmarkedPostAction({ post_id: '1', user_id: 'user123' }).then(data => {
      setPostData(data)
    })
  }, [])

  return (
    <Container className='py-12'>
      <PageHeader title='ブックマーク' className='text-center' />
      <ul className='flex flex-col gap-6 mt-5'>
        {postData?.length !== 0 &&
          postData?.map((post, index) => (
            <PostItem
              key={index}
              id={post.id}
              title={post.title}
              content={post.content}
              name={post.name}
              affiliation_name={post.affiliation_name}
              thumbnail='/images/icons/user-icon00.svg'
              bookmark_flag={post.bookmark_flag}
              updated_at={post.updated_at}
            />
          ))}
      </ul>
    </Container>
  )
}

export default BookmarkedPost
