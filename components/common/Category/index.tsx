'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { POST_TYPE } from '@/utils/constants'
import CategoryItem from './CategoryItem'
import TabItemOther from './TabItemOther'
import { CategoryType } from '@/types/categoryType'

const Category = ({ categories, toggleMenu }: { categories: CategoryType[]; toggleMenu: () => void }) => {
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
        <h4 className='font-bold cursor-pointer' onClick={() => handleCategory('all')}>
          カテゴリ
        </h4>
        <ul className='flex flex-col gap-2'>
          {categories &&
            categories.length !== 0 &&
            categories.map((item: CategoryType, index: number) => (
              <CategoryItem key={index} item={item} cat={cat} handleCategory={handleCategory} toggleMenu={toggleMenu} />
            ))}
        </ul>
      </div>
      <div className='flex flex-col gap-4'>
        <h4 className='font-bold'>トークルーム</h4>
        <ul className='w-full md:w-auto grid grid-cols-1 grid-rows-4 gap-3'>
          {POST_TYPE.map((item, index) => (
            <TabItemOther key={index} item={item} pathname={pathname} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Category
