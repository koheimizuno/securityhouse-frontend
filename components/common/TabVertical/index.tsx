'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

import TabItem from './TabItem'
import PostTabType from '@/types/postTabType'
import toast from 'react-hot-toast'

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
  }, [queryKey, searchParams, id])

  const handleTab = useCallback(
    (e: React.MouseEvent<HTMLLIElement>, title: string, index: number) => {
      if (title === 'ログアウト') {
        setTab((index + 1).toString())
        localStorage.removeItem('auth')
        toast.success('ログアウトされてしまいました。')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        const value = e.currentTarget.getAttribute('data-value')
        if (value) {
          router.push(`${pathname}?${queryKey}=${value}`)
        }
      }
    },
    [pathname, queryKey, router]
  )
  return (
    <div className={`w-full flex flex-col items-center mt-6 lg:flex-row lg:items-start ${gap && 'gap-6'}`}>
      <ul className='w-full md:w-auto grid grid-cols-4 grid-rows-1 gap-3 lg:grid-cols-1 lg:grid-rows-4'>
        {menuList &&
          menuList.map((item, index) => (
            <TabItem key={index} item={item} index={index} tab={tab} gap={gap} handleTab={handleTab} />
          ))}
      </ul>
      {children}
    </div>
  )
}

export default TabVertical
