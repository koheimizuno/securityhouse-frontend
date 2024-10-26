'use client'

import { useEffect, useState } from 'react'

import RoomPageContent from './RoomPageContent'
import { getPostsAction } from '@/actions/postAction'
import { PostType } from '@/types/postType'
import { useCategories } from './RoomPage'

const SHRoomContent = () => {
  const [postData, setPostData] = useState<PostType[]>()
  const categories = useCategories()

  useEffect(() => {
    getPostsAction({ type_id: '1' }).then(data => {
      setPostData(data)
    })
  }, [])

  return (
    postData && (
      <RoomPageContent
        title='SH会トークルーム'
        icon='/images/icons/sh-room-primary.svg'
        categories={categories}
        postData={postData}
      />
    )
  )
}

export default SHRoomContent
