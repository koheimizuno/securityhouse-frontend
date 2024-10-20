'use client'

import { useState } from 'react'

import Container from '@/components/layout/Container'
import Breadcrumb from '@/components/breadcrumb'
import SearchBar from '@/components/common/SearchBar'
import Category from '@/components/common/Category'

const RoomPage = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Breadcrumb />
      <SearchBar />
      <Container className='py-12'>
        <div className={`inline-block md:hidden ${isOpen && 'change'}`} onClick={handleMenu}>
          <div className='bar1'></div>
          <div className='bar2'></div>
          <div className='bar3'></div>
        </div>
        <div className='relative py-4 flex items-start gap-10'>
          <div
            className={`absolute top-0 left-0 z-10 h-full bg-white shadow-xl rounded-lg md:p-0 md:shadow-none md:relative overflow-hidden ${
              isOpen ? 'max-w-full px-4 py-6 border border-colorGray1 md:border-none' : 'max-w-0 md:max-w-none'
            }`}
          >
            <Category toggleMenu={handleMenu} />
          </div>
          {children}
        </div>
      </Container>
    </>
  )
}

export default RoomPage
