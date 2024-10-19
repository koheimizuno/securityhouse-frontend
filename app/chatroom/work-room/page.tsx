'use client'

import Breadcrumb from '@/components/breadcrumb'
import Category from '@/components/common/Category'
import SearchBar from '@/components/common/SearchBar'
import Container from '@/components/layout/Container'
import WorkRoomContent from '@/views/chatroom/WorkRoomContent'

const WorkRoom = () => {
  return (
    <>
      <Breadcrumb />
      <SearchBar />
      <Container>
        <div className='py-12 flex items-start gap-10'>
          <Category />
          <WorkRoomContent />
        </div>
      </Container>
    </>
  )
}

export default WorkRoom
