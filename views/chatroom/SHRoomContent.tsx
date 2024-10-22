'use client'

import RoomPageContent from './RoomPageContent'
import postdata from '@/mockup/postdata.json'

const SHRoomContent = () => {
  return (
    <RoomPageContent
      title='SH会トークルーム'
      icon='/images/icons/sh-room-primary.svg'
      category='すべて'
      categoryBio='カテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入りますカテゴリの説明が入ります'
      postData={postdata}
    />
  )
}

export default SHRoomContent
