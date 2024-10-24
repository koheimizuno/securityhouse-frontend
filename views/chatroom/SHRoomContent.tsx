'use client'

import { useEffect, useState } from 'react'

import RoomPageContent from './RoomPageContent'
import { getPostsAction } from '@/actions/postAction'
import { PostType } from '@/types/postType'

const SHRoomContent = () => {
  const [postData, setPostData] = useState<PostType[] | null>(null)

  useEffect(() => {
    getPostsAction({ type_id: '1' }).then(data => {
      setPostData(data)
    })
  }, [])

  return (
    <RoomPageContent
      title='SH会トークルーム'
      icon='/images/icons/sh-room-primary.svg'
      category='すべて'
      categoryBio='カテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入ります'
      postData={postData}
    />
  )
}

export default SHRoomContent
