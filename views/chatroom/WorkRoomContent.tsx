'use client'

import { useEffect, useState } from 'react'

import RoomPageContent from './RoomPageContent'
import { PostType } from '@/types/postType'
import { getPostsAction } from '@/actions/postAction'

const WorkRoomContent = () => {
  const [postData, setPostData] = useState<PostType[] | null>(null)

  useEffect(() => {
    getPostsAction({ type_id: '2' }).then(data => {
      setPostData(data)
    })
  }, [])
  console.log(postData)

  return (
    <RoomPageContent
      title='仕事トークルーム'
      icon='/images/icons/work-room-primary.svg'
      category='すべて'
      categoryBio='カテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入ります'
      postData={postData}
    />
  )
}

export default WorkRoomContent
