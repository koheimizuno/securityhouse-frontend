'use client'

import { useEffect, useState } from 'react'

import RoomPageContent from './RoomPageContent'
import { getPostsAction } from '@/actions/postAction'
import { PostType } from '@/types/postType'

const BossRoomContent = () => {
  const [postData, setPostData] = useState<PostType[] | null>(null)

  useEffect(() => {
    getPostsAction({ type_id: '4' }).then(data => {
      setPostData(data)
    })
  }, [])
  return (
    <RoomPageContent
      title='社長室トークルーム'
      icon='/images/icons/boss-room-primary.svg'
      category='すべて'
      categoryBio='カテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入ります'
      postData={postData}
    />
  )
}

export default BossRoomContent
