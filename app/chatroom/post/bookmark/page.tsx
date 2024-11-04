'use client'

import React, { useEffect, useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import MainItem from '@/components/common/MainItem'
import { getBookmarkedPostAction } from '@/actions/postAction'
import { PostType } from '@/types/postType'

const BookmarkedPostPage = () => {
  const [postData, setPostData] = useState<PostType[] | null>(null)

  useEffect(() => {
    getBookmarkedPostAction({ post_id: '1', user_id: 'user123' }).then(data => {
      setPostData(data)
    })
  }, [])

  return (
    <Container className='py-16 flex flex-col gap-8'>
      <PageHeader title='ブックマーク' className='text-center' />
      <ul className='flex flex-col gap-6'>
        {postData &&
          postData?.map((post, index) => (
            <MainItem
              key={index}
              id={post.id}
              title={post.title}
              content={post.content}
              name={post.name}
              affiliation_name={post.affiliation_name}
              thumbnail='/images/icons/user-icon00.svg'
              bookmark_flag={post.bookmark_flag}
              created_at={post.created_at}
            />
          ))}
      </ul>
    </Container>
  )
}

export default BookmarkedPostPage
