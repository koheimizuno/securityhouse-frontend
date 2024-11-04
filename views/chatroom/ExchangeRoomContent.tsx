'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import RoomPageContent from './RoomPageContent'
import { getPostsAction } from '@/actions/postAction'
import { PostType } from '@/types/postType'
import { useRoom } from '@/hooks/RoomContext'
import { useAuthentication } from '@/hooks/AuthContext'
import { CategoryType } from '@/types/categoryType'

const ExchangeRoomContent = () => {
  const searchParams = useSearchParams()
  const [postData, setPostData] = useState<PostType[]>([])
  const { categories } = useRoom()
  const { user_id } = useAuthentication()
  const category_id = searchParams.get('cat') || '0'

  const [selectedCat, setSelectedCat] = useState<CategoryType>({
    title: '',
    description: ''
  })

  useEffect(() => {
    if (category_id && category_id !== 'all') {
      categories.map((category: CategoryType) => {
        if (category.category_id === category_id)
          setSelectedCat(prevState => ({ ...prevState, title: category.title, description: category.description }))
      })
    } else {
      setSelectedCat(prevState => ({ ...prevState, title: 'すべて', description: '' }))
    }
  }, [categories, searchParams, category_id])

  useEffect(() => {
    getPostsAction({ user_id, type_id: '3', category_id }).then(data => {
      setPostData(data)
    })
  }, [user_id, category_id])

  return (
    postData && (
      <RoomPageContent
        title='交流トークルーム'
        icon='/images/icons/exchange-room-primary.svg'
        category_title={selectedCat.title}
        category_description={selectedCat.description}
        postData={postData}
      />
    )
  )
}

export default ExchangeRoomContent
