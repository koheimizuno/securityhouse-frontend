'use client'

import React, { useEffect, useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import MainItem from '@/components/common/MainItem'
import { getBmarkPostListAction } from '@/actions/postAction'
import { PostType } from '@/types/postType'
import { useAuthentication } from '@/hooks/AuthContext'

const BookmarkedPostPage = () => {
  const [postData, setPostData] = useState<PostType[] | null>(null)
  const { session_user_id } = useAuthentication()

  useEffect(() => {
    getBmarkPostListAction({ user_id: session_user_id }).then(data => {
      setPostData(data)
    })
  }, [session_user_id])

  return (
    <Container className='py-16 flex flex-col gap-8'>
      <PageHeader title='ブックマーク' subtitle='マイページ' />
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
