'use client'

import React, { useEffect, useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import MainItem from '@/components/common/MainItem'
import { getBmarkPostListAction } from '@/actions/postAction'
import { PostType } from '@/types/postType'
import { useAuthentication } from '@/hooks/AuthContext'

const BookmarkedPostPage = () => {
  const [bookmarkedPost, setBookmarkedPost] = useState<PostType[] | null>(null)
  const { session_user_id } = useAuthentication()

  useEffect(() => {
    getBmarkPostListAction({ user_id: session_user_id }).then(data => {
      setBookmarkedPost(data)
    })
  }, [session_user_id])

  console.log(bookmarkedPost)

  return (
    <Container className='py-16 flex flex-col gap-8'>
      <PageHeader title='ブックマーク' subtitle='マイページ' />
      <ul className='flex flex-col gap-6'>
        {bookmarkedPost &&
          bookmarkedPost
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .map((item, index) => (
              <MainItem
                key={index}
                id={item.id}
                title={item.title}
                content={item.content}
                category_name={item.category_name}
                user_id={item.user_id}
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
