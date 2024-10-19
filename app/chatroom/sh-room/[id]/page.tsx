'use client'

import React from 'react'

import Breadcrumb from '@/components/breadcrumb'
import SearchBar from '@/components/common/SearchBar'
import Container from '@/components/layout/Container'

const SHRoomPostDetail = () => {
  return (
    <>
      <Breadcrumb />
      <SearchBar />
      <div className='bg-bgSemiblue py-12'>
        <Container>
          <h2 className='text-3xl font-bold text-center'>SH会</h2>
        </Container>
      </div>
    </>
  )
}

export default SHRoomPostDetail
