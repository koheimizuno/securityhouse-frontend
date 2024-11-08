'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import RoomPageContent from './RoomPageContent'
import { getPostsAction } from '@/actions/postAction'
import { PostType } from '@/types/postType'
import { useRoom } from '@/hooks/RoomContext'
import { CategoryType } from '@/types/categoryType'

const SHRoomContent = () => {
  const searchParams = useSearchParams()
  const [postData, setPostData] = useState<PostType[]>([])
  const { categories } = useRoom()
  const category_id = searchParams.get('cat') || '0'

  const [selectedCat, setSelectedCat] = useState<CategoryType>({
    title: '',
    description: ''
  })

  useEffect(() => {
    if (categories && category_id && category_id !== 'all') {
      categories.map((category: CategoryType) => {
        if (category.category_id === category_id)
          setSelectedCat(prevState => ({ ...prevState, title: category.title, description: category.description }))
      })
    } else {
      setSelectedCat(prevState => ({ ...prevState, title: 'すべて', description: '' }))
    }
  }, [categories, searchParams, category_id])

  useEffect(() => {
    getPostsAction({ type_id: '1', category_id }).then(data => {
      setPostData(data)
    })
  }, [category_id])

  return (
    postData && (
      <RoomPageContent
        title='SH会トークルーム'
        icon='/images/icons/sh-room-primary.svg'
        category_title={selectedCat.title}
        category_description={selectedCat.description}
        postData={postData}
      />
    )
  )
}

export default SHRoomContent
