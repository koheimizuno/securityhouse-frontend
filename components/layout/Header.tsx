'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@nextui-org/react'
import { isDisplayHeaderPage, isUserPage } from '@/utils/isPublicPage'
import { useAuthentication } from '@/hooks/AuthContext'
import { getUserByIdAction } from '@/actions/authAction'

import { UsersType } from '@/types/userType'

const Header = () => {
  const pathname = usePathname()
  const [userData, setUserData] = useState<UsersType | null>(null)
  const { session_user_id } = useAuthentication()
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { isAuthenticated } = useAuthentication()
  const isDisplayHeader = isDisplayHeaderPage(pathname)
  const isUser = isUserPage(pathname)

  const handleHamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen)
  }

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // ドロップダウンメニューの開閉を切り替え
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    window.location.href = '/login'; // ログインページへリダイレクト
  };

  useEffect(() => {
    if (session_user_id) {
      getUserByIdAction(session_user_id).then(data => setUserData(data))
    }
  }, [session_user_id])

  return (
    <header className='fixed top-0 w-full bg-white z-20 shadow-sm'>
      <nav className='relative px-4 sm:px-[27px] py-4 border-b-[1px]'>
        <div className='flex flex-row flex-wrap items-center justify-between gap-3 md:gap-0'>
          <div className='flex flex-col items-start gap-0 md:flex-row md:items-center md:gap-2'>
            <Link href='/'>
              <Image src='/images/icons/logo.svg' className='object-contain' alt='Logo' width={217} height={40} />
            </Link>
            <Link href='/sh-club' className='text-[15px] font-bold text-[#333] ps-2 md:ps-0'>
              {!isUser ? ('管理者ページ') : ('SH会員専用ページ')}
            </Link>
          </div>
          {!isUser && (
            <div className="relative">
              {/* 名前とドロップダウンボタン */}
              <button
                onClick={handleDropdown} // ドロップダウン開閉処理
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 transition focus:outline-none"
              >
                <span className="hidden md:inline">{userData?.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 focus:outline-none"
                  >
                    ログアウト
                  </button>
                </div>
              )}
            </div>
)}
          {isUser && (
            <div
              className={`absolute top-[95.5px] right-0 z-20 w-full bg-white shadow-md flex-col gap-6 sm:static sm:shadow-none sm:top-0 sm:right-0 sm:w-auto sm:max-h-full flex sm:flex-row items-center sm:gap-2 transition-all duration-300 ease-in-out ${
                isHamburgerOpen ? 'max-h-[1000px] overflow-visible py-8' : 'max-h-0 overflow-hidden'
              }`}
            >
              <Link href='/dm'>
                <Button
                  color='primary'
                  className='rounded-full w-[200px]'
                  startContent={
                    <Image
                      src='/images/icons/message-icon.svg'
                      alt='message-icon'
                      className='w-5 h-5'
                      width={16}
                      height={16}
                    />
                  }
                >
                  メッセージ
                </Button>
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href='/chatroom/post/bookmark/'>
                    <Button
                      color='primary'
                      className='rounded-full w-[200px]'
                      startContent={
                        <Image
                          src='/images/icons/bookmark-icon-white.svg'
                          alt='bookmark-icon-white'
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
          )}
          {isUser && (
            <div className={`${isHamburgerOpen ? 'change' : ''} sm:hidden`} onClick={handleHamburger}>
              <div className='bar1'></div>
              <div className='bar2'></div>
              <div className='bar3'></div>
            </div>
          )}
        </div>
      </nav>
      {isDisplayHeader && isUser && (
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
              href='/document'
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
