'use client'

import RoomPageContent from './RoomPageContent'
import postdata from '@/mockup/postdata.json'

const BossRoomContent = () => {
  return (
    <RoomPageContent
      title='社長室トークルーム'
      icon='/images/icons/boss-room-primary.svg'
      category='すべて'
      categoryBio='カテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入ります'
      postData={postdata}
    />
  )
}

export default BossRoomContent
