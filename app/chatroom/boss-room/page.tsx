'use client'

import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import Category from '@/components/common/Category'
import SearchBar from '@/components/common/SearchBar'
import Container from '@/components/layout/Container'
import BossRoomContent from '@/views/chatroom/BossRoomContent'

const BossRoom = () => {
  return (
    <>
      <Breadcrumb />
      <SearchBar />
      <Container>
        <div className='py-12 flex items-start gap-10'>
          <Category />
          <BossRoomContent />
        </div>
      </Container>
    </>
  )
}

export default BossRoom
