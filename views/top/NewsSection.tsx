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

const NewsSection = () => {
  const [news, setNews] = useState<NewsType[]>([])

  useEffect(() => {
    getNewsAction().then(data => setNews(data))
  }, [])

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
            Array.isArray(news) &&
            news.map(newItem => (
              <NewsItem
                key={newItem.id}
                name='山田太郎'
                affiliation_name='所属名'
                thumbnail=''
                title={newItem.title}
                content={newItem.content}
                bookmark_flag={newItem.bookmark_flag}
                updated_at={newItem.created_at}
              />
            ))}
        </ul>
      </div>
    </Container>
  )
}

export default NewsSection
