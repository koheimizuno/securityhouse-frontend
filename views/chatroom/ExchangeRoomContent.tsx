'use client'

import RoomPageContent from './RoomPageContent'
import postdata from '@/mockup/postdata.json'

const ExchangeRoomContent = () => {
  return (
    <RoomPageContent
      title='交流トークルーム'
      category='すべて'
      categoryBio='カテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入ります'
      postData={postdata}
    />
  )
}

export default ExchangeRoomContent
