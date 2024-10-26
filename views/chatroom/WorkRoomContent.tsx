'use client'

import { useEffect, useState } from 'react'

import RoomPageContent from './RoomPageContent'
import { PostType } from '@/types/postType'
import { getPostsAction } from '@/actions/postAction'
import { useCategories } from './RoomPage'

const WorkRoomContent = () => {
  const [postData, setPostData] = useState<PostType[]>([])
  const { categories, postTypes } = useCategories()

  useEffect(() => {
    getPostsAction({ type_id: '2' }).then(data => {
      setPostData(data)
    })
  }, [])

  return (
    postData && (
      <RoomPageContent
        title='仕事トークルーム'
        icon='/images/icons/work-room-primary.svg'
        postTypes={postTypes}
        categories={categories}
        postData={postData}
      />
    )
  )
}

export default WorkRoomContent
