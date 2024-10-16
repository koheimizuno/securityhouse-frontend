'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

import getImageAlt from '@/utils/getImageAlt'

interface TabVerticalProps {
  queryKey: string
  menuList: {
    icon: string[]
    title: string
  }[]
  gap?: boolean
  children: React.ReactNode
}

const TabVertical = ({ queryKey, menuList, children, gap }: TabVerticalProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = useParams()
  const [tab, setTab] = useState<string>('1')

  const id = params.id

  useEffect(() => {
    const tab = searchParams.get(queryKey)
    if (tab) {
      setTab(tab)
    }
  }, [searchParams, id])

  const handleTab = (e: React.MouseEvent<HTMLLIElement>, title: string, index: number) => {
    if (title === 'ログアウト') {
      setTab((index + 1).toString())
      router.push(pathname)
      // Logout Action
    } else {
      const value = e.currentTarget.getAttribute('data-value')
      if (value) {
        router.push(`${pathname}?${queryKey}=${value}`)
      }
    }
  }
  return (
    <div className={`w-full flex flex-col items-center mt-6 lg:flex-row lg:items-start ${gap && 'gap-6'}`}>
      <ul className='w-full md:w-auto grid grid-cols-4 grid-rows-1 gap-3 lg:grid-cols-1 lg:grid-rows-4'>
        {menuList.map((item, index) => (
          <li
            key={index}
            className={`border sm:flex sm:flex-row sm:items-center sm:gap-2  p-3 lg:px-6 lg:h-[72px] lg:gap-4 ${
              gap ? 'rounded-xl' : 'rounded-t-lg lg:rounded-none lg:rounded-l-xl'
            } cursor-pointer shadow-lg transition-all duration-500 ${
              tab === (index + 1).toString()
                ? 'bg-primary border-primary'
                : 'bg-white border-colorGray1 hover:bg-hoverPrimary hover:border-hoverPrimary'
            }`}
            data-value={index + 1}
            onClick={e => handleTab(e, item.title, index)}
          >
            <div className='lg:w-[50px]'>
              <Image
                src={tab === (index + 1).toString() ? item.icon[1] : item.icon[0]}
                alt={tab === (index + 1).toString() ? getImageAlt(item.icon[1]) || '' : getImageAlt(item.icon[0]) || ''}
                className='w-[25px] h-[25px] m-auto md:w-[28px] md:h-[28px] lg:m-0 text-primary'
                width={28}
                height={28}
              />
            </div>
            <p
              className={`hidden font-bold sm:block lg:flex lg:items-center lg:justify-between lg:w-full lg:gap-2 ${
                tab === (index + 1).toString() && 'text-white'
              } lg:text-[18px] xl:gap-6`}
            >
              <span dangerouslySetInnerHTML={{ __html: item.title }}></span>
              <Image
                src={tab === (index + 1).toString() ? '/images/arrow-right-white.svg' : '/images/arrow-right.svg'}
                alt={tab === (index + 1).toString() ? 'arrow-right-white' : 'arrow-right'}
                className='w-[6px] h-[12px] hidden lg:block'
                width={6}
                height={12}
              />
            </p>
          </li>
        ))}
      </ul>
      {children}
    </div>
  )
}

export default TabVertical
