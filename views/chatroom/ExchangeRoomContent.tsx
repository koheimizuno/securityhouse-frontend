'use client'

import { useEffect, useState } from 'react'

import RoomPageContent from './RoomPageContent'
import { getPostsAction } from '@/actions/postAction'
import { PostType } from '@/types/postType'
import { useCategories } from './RoomPage'

const ExchangeRoomContent = () => {
  const [postData, setPostData] = useState<PostType[]>([])
  const categories = useCategories()

  useEffect(() => {
    getPostsAction({ type_id: '3' }).then(data => {
      setPostData(data)
    })
  }, [])
  return (
    postData && (
      <RoomPageContent
        title='交流トークルーム'
        icon='/images/icons/exchange-room-primary.svg'
        categories={categories}
        postData={postData}
      />
    )
  )
}

export default ExchangeRoomContent
