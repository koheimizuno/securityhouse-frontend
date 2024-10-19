'use client'

import React, { useState, useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { POST_TYPE } from '@/utils/constants'
import { getImageAlt } from '@/utils/getImageAlt'
import postCategory from '@/mockup/postCategory.json'
import CategoryItem from './CategoryItem'
import TabItemOther from './TabItemOther'

const Category = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [cat, setCat] = useState('all')

  useEffect(() => {
    const catQuery = searchParams.get('cat')
    if (catQuery) {
      setCat(catQuery)
    }
  }, [searchParams])

  const handleCategory = (segment: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('cat', segment)
    router.push(`${pathname}?${newSearchParams.toString()}`)
  }

  return (
    <div className='w-[206px] flex flex-col gap-12'>
      <div className='flex flex-col gap-4'>
        <h4 className='font-bold'>カテゴリ</h4>
        <ul className='flex flex-col gap-2'>
          {postCategory.map((item, index) => (
            <CategoryItem key={index} item={item} cat={cat} handleCategory={handleCategory} />
          ))}
        </ul>
      </div>
      <div className='flex flex-col gap-4'>
        <h4 className='font-bold'>トークルーム</h4>
        <ul className='w-full md:w-auto grid grid-cols-4 grid-rows-1 gap-3 lg:grid-cols-1 lg:grid-rows-4'>
          {POST_TYPE.map((item, index) => (
            <TabItemOther key={index} item={item} pathname={pathname} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Category
