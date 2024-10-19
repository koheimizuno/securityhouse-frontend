'use client'

import React, { useEffect, useState } from 'react'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

import TabItem from './TabItem'
import { PostTabType } from '@/types/postType'

interface TabVerticalProps {
  queryKey: string
  menuList: PostTabType[]
  gap?: boolean
  children: React.ReactNode
}

const TabVertical = ({ queryKey, menuList, children, gap }: TabVerticalProps) => {
  const { id } = useParams()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<string>('1')

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
          <TabItem key={index} item={item} index={index} tab={tab} gap={gap} handleTab={handleTab} />
        ))}
      </ul>
      {children}
    </div>
  )
}

export default TabVertical
