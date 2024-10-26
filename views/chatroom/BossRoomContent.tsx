'use client'

import { useEffect, useState } from 'react'

import RoomPageContent from './RoomPageContent'
import { getPostsAction } from '@/actions/postAction'
import { PostType } from '@/types/postType'
import { useRoom } from './RoomPage'

const BossRoomContent = () => {
  const [postData, setPostData] = useState<PostType[]>([])
  const { categories, postTypes } = useRoom()

  useEffect(() => {
    getPostsAction({ type_id: '4' }).then(data => {
      setPostData(data)
    })
  }, [])

  return (
    postData && (
      <RoomPageContent
        title='社長室トークルーム'
        icon='/images/icons/boss-room-primary.svg'
        postTypes={postTypes}
        categories={categories}
        postData={postData}
      />
    )
  )
}

export default BossRoomContent
