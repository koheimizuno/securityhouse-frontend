'use client'

import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import SearchBar from '@/components/common/SearchBar'
import Container from '@/components/layout/Container'
import Category from '@/views/chatroom/Category'
import SHRoomContent from '@/views/chatroom/SHRoomContent'

const ShRoom = () => {
  return (
    <>
      <Breadcrumb />
      <SearchBar />
      <Container>
        <div className='py-12 flex items-start gap-10'>
          <Category />
          <SHRoomContent />
        </div>
      </Container>
    </>
  )
}

export default ShRoom