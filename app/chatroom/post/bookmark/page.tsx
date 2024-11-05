'use client'

import React, { useEffect, useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import MainItem from '@/components/common/MainItem'
import { getMypageBmarkPostListAction } from '@/actions/postAction'
import { PostType } from '@/types/postType'

const BookmarkedPostPage = () => {
  const [postData, setPostData] = useState<PostType[] | null>(null)

  useEffect(() => {
    getMypageBmarkPostListAction().then(data => {
      setPostData(data)
    })
  }, [])

  return (
    <Container className='py-16 flex flex-col gap-8'>
      <PageHeader title='ブックマーク' className='text-center' />
      <ul className='flex flex-col gap-6'>
        {postData &&
          postData?.map(item => (
            <MainItem
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              category_name={item.category_name}
              user_name={item.name}
              affiliation_name={item.affiliation_name}
              thumbnail={item.thumbnail}
              nice_flag={item.nice_flag}
              like_count={item.like_count}
              bookmark_flag={item.bookmark_flag}
              created_at={item.created_at}
            />
          ))}
      </ul>
    </Container>
  )
}

export default BookmarkedPostPage
