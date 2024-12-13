'use client'

import React from 'react'
import { useCallback, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Image, Link } from '@nextui-org/react'

const menuItems = [
  { title: 'ユーザー', href: '/admin/users' },
  { title: 'グループ', href: '/admin/groups' },
  { title: '会社', href: '/admin/companies' },
  { title: 'お知らせ', href: '/admin/news' },
  { title: 'お知らせカテゴリー', href: '/admin/news_categories' },
  { title: 'カタログ', href: '/admin/catalogs' },
  { title: 'カタログカテゴリー', href: '/admin/catalog_categories' },
  { title: '投稿先', href: '/admin/post_types' },
  { title: '投稿', href: '/admin/posts' },
  { title: '投稿カテゴリー', href: '/admin/post_categories' },
  { title: 'ランキング', href: '/admin/ranking' },
  { title: 'バッジ', href: '/admin/badges' },
  { title: 'チャレンジ', href: '/admin/challenges' },
  { title: '動画', href: '/admin/videos' },
  { title: 'SHブランド', href: '/admin/shbrands' },
  { title: 'SHブランドカテゴリー', href: '/admin/shbrand_categories' },
  { title: 'TAKEX', href: '/admin/takex' },
  { title: 'TAKEXカテゴリー', href: '/admin/takex_categories' },
  { title: 'セキュリティ', href: '/admin/securitynets' },
  { title: 'セキュリティカテゴリー', href: '/admin/securitynet_category' },
  { title: 'INEXT', href: '/admin/inext' },
  { title: 'INEXTカテゴリー', href: '/admin/inext_categories' },
  { title: '資料', href: '/admin/documents' },
  { title: '資料カテゴリー', href: '/admin/document_categories' },
]

const Sidemenu = () => {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  const handleMenu = useCallback(() => {
      setIsOpen(prevState => !prevState)
  }, [])

  return (
    
    <div className='w-[350px] -top-10 flex flex-col gap-12 mr-16 absolute md:relative'>
      <div className={`absolute inline-block md:hidden ${isOpen && 'change'}`} onClick={handleMenu}>
        <div className='bar1'></div>
        <div className='bar2'></div>
        <div className='bar3'></div>
      </div>
      <div
        className={`absolute top-10 left-0 z-10 max-h-[350px] md:max-h-full md:h-full bg-white shadow-xl overflow-auto rounded-lg md:p-0 md:shadow-none md:relative ${
          isOpen ? 'max-w-full px-4 py-6 border border-colorGray1 md:border-none' : 'max-w-0 md:max-w-none'
        }`}
      >
        <ul className='flex flex-col gap-2'>
          {menuItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <li
                key={item.href}
                className={`flex items-center gap-2 text-sm rounded-full ps-5 pe-2 py-2 cursor-pointer hover:bg-hoverPrimary transition-all duration-300 ${
                  isActive ? 'bg-primary text-white' : ''
                }`}
              >
                <Link href={item.href}>
                  <Image
                    src={isActive ? '/images/icons/arrow-right-white.svg' : '/images/icons/arrow-right.svg'}
                    alt='arrow-right'
                    className='w-[6px] h-[12px]'
                    width={6}
                    height={12}
                  />
                  <span className={`ml-2 ${isActive ? 'text-white' : 'text-black underline'}`}>
                    {item.title}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sidemenu
