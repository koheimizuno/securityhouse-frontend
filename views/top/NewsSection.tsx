'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Container from '@/components/layout/Container'
import SectionTitle from '@/components/common/SectionTitle'
import NewsItem from '@/views/news/NewsItem'
import { Button } from '@nextui-org/react'
import { getNewsAction } from '@/actions/newsAction'
import { NewsType } from '@/types/newsType'
import { useAuthentication } from '@/hooks/AuthContext'

const NewsSection = () => {
  const [news, setNews] = useState<NewsType[]>([])
  const { session_user_id } = useAuthentication()

  useEffect(() => {
    getNewsAction({ user_id: session_user_id }).then(data => setNews(data))
  }, [session_user_id])

  return (
    <Container>
      <div className='flex flex-col gap-4 items-center md:flex-row md:items-start md:gap-[40px] xl:gap-[96px]'>
        <div className='flex flex-col justify-center items-start md:items-center gap-2 md:gap-6 w-full md:w-auto'>
          <SectionTitle title='新着情報' icon='/images/icons/info-icon.svg' />
          <Button
            size='lg'
            color='primary'
            className='hidden md:flex h-14 px-12 rounded-full font-bold'
            endContent={
              <Image
                src='/images/icons/arrow-circle-right-outline.svg'
                alt='arrow-circle-right-outline'
                width={20}
                height={20}
                className={`w-6 h-6`}
              />
            }
          >
            <Link href='/news'>一覧を見る</Link>
          </Button>
        </div>
        <div className='w-full md:hidden text-right'>
          <Link href='/news' className='underline font-bold'>
            一覧を見る
          </Link>
        </div>
        <ul className='secondary-scroll flex flex-col items-center w-full h-[500px] md:h-[330px] overflow-y-scroll pr-6'>
          {news &&
            news
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map(newItem => (
                <NewsItem
                  key={newItem.id}
                  id={newItem.id}
                  user_name={newItem.name}
                  affiliation_name={newItem.affiliation_name}
                  thumbnail={newItem.thumbnail}
                  category_name={newItem.category_name}
                  title={newItem.title}
                  content={newItem.content}
                  bookmark_flag={newItem.bookmark_flag}
                  created_at={newItem.created_at}
                />
              ))}
        </ul>
      </div>
    </Container>
  )
}

export default NewsSection
