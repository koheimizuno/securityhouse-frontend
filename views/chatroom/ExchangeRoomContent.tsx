'use client'

import { useEffect, useState } from 'react'

import RoomPageContent from './RoomPageContent'
import { getPostsAction } from '@/actions/postAction'
import { PostType } from '@/types/postType'

const ExchangeRoomContent = () => {
  const [postData, setPostData] = useState<PostType[] | null>(null)

  useEffect(() => {
    getPostsAction({ type_id: '3' }).then(data => {
      setPostData(data)
    })
  }, [])
  return (
    <RoomPageContent
      title='交流トークルーム'
      icon='/images/icons/exchange-room-primary.svg'
      category='すべて'
      categoryBio='カテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入ります'
      postData={postData}
    />
  )
}

export default ExchangeRoomContent
