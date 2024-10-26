'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import Container from '@/components/layout/Container'
import SectionTitle from '@/components/common/SectionTitle'
import NewsItem from '@/views/news/NewsItem'
import { Button } from '@nextui-org/react'
import { getNewsAction } from '@/actions/newsAction'
import { NewsType } from '@/types/newsType'

const NewsSection = () => {
  const [news, setNews] = useState<NewsType[] | null>(null)

  useEffect(() => {
    getNewsAction().then(data => {
      setNews(data)
    })
  }, [])

  return (
    <Container>
      <div className='flex flex-col gap-4 items-center md:flex-row md:items-start md:gap-[40px] xl:gap-[96px]'>
        <div className='flex flex-col justify-center items-start md:items-center gap-2 md:gap-6 w-full md:w-auto'>
          <SectionTitle title='新着情報' icon='/images/icons/info-icon.svg' />
          <Button
            size='lg'
            color='primary'
            className='h-14 px-12 rounded-full font-bold'
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
            一覧を見る
          </Button>
        </div>
        <div className='w-full md:hidden text-right'>
          <a href='#' className='underline font-bold'>
            一覧を見る
          </a>
        </div>
        <ul className='secondary-scroll flex flex-col items-center w-full h-[500px] md:h-[330px] overflow-y-scroll pr-6'>
          {news &&
            news.map(newItem => (
              <NewsItem
                name='山田太郎'
                affiliation_name='所属名'
                thumbnail=''
                title={newItem.title}
                content={newItem.content}
                bookmark_flag={newItem.bookmark_flag}
                updated_at={newItem.updated_at}
              />
            ))}
        </ul>
      </div>
    </Container>
  )
}

export default NewsSection
