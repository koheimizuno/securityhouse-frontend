'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@nextui-org/react'
import { isDisplayHeaderPage } from '@/utils/isPublicPage'
import { useAuthentication } from '@/hooks/AuthContext'

const Header = () => {
  const pathname = usePathname()
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const { isAuthenticated } = useAuthentication()
  const isDisplayHeader = isDisplayHeaderPage(pathname)

  const handleHamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen)
  }
  return (
    <header className='fixed top-0 w-full bg-white z-20 shadow-sm'>
      <nav className='relative px-4 sm:px-[27px] py-4 border-b-[1px]'>
        <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
          <div className='flex flex-col items-start gap-0 md:flex-row md:items-center md:gap-2'>
            <Link href='/'>
              <Image src='/images/icons/logo.svg' className='object-contain' alt='Logo' width={217} height={40} />
            </Link>
            <Link href='/sh-club' className='text-[15px] font-bold text-[#333] ps-2 md:ps-0'>
              SH会員専用ページ
            </Link>
          </div>
          <div
            className={`absolute top-[95.5px] right-0 z-20 w-full bg-white shadow-md flex-col gap-6 sm:static sm:shadow-none sm:top-0 sm:right-0 sm:w-auto sm:max-h-full flex sm:flex-row items-center sm:gap-2 transition-all duration-300 ease-in-out ${
              isHamburgerOpen ? 'max-h-[1000px] overflow-visible py-8' : 'max-h-0 overflow-hidden'
            }`}
          >
            {isAuthenticated ? (
              <>
                <Link href='/chatroom/post/bookmark/'>
                  <Button
                    className='rounded-full w-[200px]'
                    startContent={
                      <Image
                        src='/images/icons/bookmark-icon-black.svg'
                        alt='bookmark-icon-black'
                        className='w-5 h-5'
                        width={16}
                        height={16}
                      />
                    }
                  >
                    ブックマーク
                  </Button>
                </Link>
                <Link href='/profile/1'>
                  <Button
                    color='primary'
                    className='rounded-full w-[200px]'
                    startContent={
                      <Image
                        src='/images/icons/user-icon.svg'
                        alt='user-icon'
                        className='w-5 h-5'
                        width={16}
                        height={16}
                      />
                    }
                  >
                    マイページ
                  </Button>
                </Link>
              </>
            ) : (
              <Link href='/login'>
                <Button
                  className='rounded-full w-[200px]'
                  startContent={
                    <Image src='/images/icons/login.svg' alt='login' className='w-5 h-5' width={16} height={16} />
                  }
                >
                  マイページ
                </Button>
              </Link>
            )}
          </div>
          <div className={`${isHamburgerOpen ? 'change' : ''} sm:hidden`} onClick={handleHamburger}>
            <div className='bar1'></div>
            <div className='bar2'></div>
            <div className='bar3'></div>
          </div>
        </div>
      </nav>
      {isDisplayHeader && (
        <ul className='sm:grid sm:grid-cols-4 bg-primary'>
          <li className='border-b sm:border-r border-colorGray1'>
            <Link
              href='/'
              className='flex justify-center items-center py-[13px] font-bold text-colorGray1 hover:bg-[#003d8a]'
            >
              トークルーム
            </Link>
          </li>
          <li className='border-b sm:border-r border-colorGray1'>
            <Link
              href='/news'
              className='flex justify-center items-center py-[13px] font-bold text-colorGray1 hover:bg-[#003d8a]'
            >
              お知らせ
            </Link>
          </li>
          <li className='border-b sm:border-r border-colorGray1'>
            <Link
              href='/document/sales-office/flyer-proposal'
              className='flex justify-center items-center py-[13px] font-bold text-colorGray1 hover:bg-[#003d8a]'
            >
              資料集
            </Link>
          </li>
          <li>
            <Link
              href='/sh-club'
              className='flex justify-center items-center py-[13px] font-bold text-colorGray1 hover:bg-[#003d8a]'
            >
              SH会情報
            </Link>
          </li>
        </ul>
      )}
    </header>
  )
}

export default Header
