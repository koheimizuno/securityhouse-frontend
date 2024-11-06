'use client'

import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import PageHeader from '@/components/common/PageHeader'
import Container from '@/components/layout/Container'
import Category from '@/components/common/Category'
import MainItem from '@/components/common/MainItem'
import { Button, Pagination } from '@nextui-org/react'

import { NewsType } from '@/types/newsType'
import { RootState } from '@/redux-store'
import { getCategoryAction } from '@/redux-store/slices/categorySlice'
import { CategoryType } from '@/types/categoryType'
import { getNewsAction } from '@/actions/newsAction'
import { NewsContext } from '@/hooks/NewsContext'
import { useAuthentication } from '@/hooks/AuthContext'

const NewsPage = () => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const [news, setNews] = useState<NewsType[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const { session_user_id } = useAuthentication()
  const [selectedCat, setSelectedCat] = useState<CategoryType>({
    title: '',
    description: ''
  })
  const { categories } = useSelector((state: RootState) => state.category)

  useEffect(() => {
    getNewsAction({ user_id: session_user_id }).then(data => setNews(data))
  }, [session_user_id])

  useEffect(() => {
    dispatch(
      getCategoryAction({
        pageFlag: '1',
        type_id: '5'
      })
    )
  }, [dispatch])

  useEffect(() => {
    const catQuery = searchParams.get('cat')
    if (catQuery && catQuery !== 'all') {
      categories.map((category: CategoryType) => {
        if (category.title === catQuery)
          setSelectedCat(prevState => ({ ...prevState, title: category.title, description: category.description }))
      })
    } else {
      setSelectedCat(prevState => ({ ...prevState, title: 'すべて', description: '' }))
    }
  }, [categories, searchParams])

  const handleMenu = useCallback(() => {
    setIsOpen(prevState => !prevState)
  }, [])

  return (
    <NewsContext.Provider value={{ categories: categories }}>
      <Container className='py-12 flex flex-col gap-8'>
        <PageHeader title='お知らせ一覧' className='text-center' />
        <Link href='/news/create' className='text-right'>
          <Button
            className='rounded-full'
            color='primary'
            startContent={
              <Image src='/images/icons/edit-white.svg' alt='edit-white' className='w-5 h-5' width={16} height={16} />
            }
          >
            登録
          </Button>
        </Link>
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
            <Category categories={categories} toggleMenu={handleMenu} />
          </div>
          <div className='md:w-[calc(100%-246px)] bg-bgSemiblue px-4 py-8 md:p-8 flex flex-col gap-6 rounded-2xl'>
            <h2 className='text-[32px] font-bold'>{selectedCat.title}</h2>
            {<p>{selectedCat.description}</p>}
            <ul className='flex flex-col items-center sm:flex-row sm:flex-wrap gap-5'>
              {news &&
                news.map(newItem => (
                  <MainItem
                    key={newItem.id}
                    id={newItem.id}
                    title={newItem.title}
                    content={newItem.content}
                    category_name={newItem.category_name}
                    user_name={newItem.user_name}
                    affiliation_name={newItem.affiliation_name}
                    thumbnail={newItem.thumbnail}
                    nice_flag='1'
                    like_count={newItem.like_count}
                    bookmark_flag={newItem.bookmark_flag}
                    created_at={newItem.created_at}
                  />
                ))}
            </ul>
            {news && news?.length > 3 && (
              <Pagination
                total={Math.round(news?.length / 3)}
                initialPage={1}
                className='gap-2 m-auto'
                siblings={window.innerWidth > 425 ? 1 : 0}
                showControls
              />
            )}
          </div>
        </div>
      </Container>
    </NewsContext.Provider>
  )
}

export default NewsPage
