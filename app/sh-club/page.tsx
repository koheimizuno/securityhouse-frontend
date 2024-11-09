'use client'

import { useState } from 'react'

import Category from '@/components/common/Category'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import Container from '@/components/layout/Container'
import DocCardButton from '@/views/document/DocCardButton'

const categories = [
  {
    id: '1',
    title: '2023年'
  },
  {
    id: '2',
    title: '2022年'
  },
  {
    id: '3',
    title: '2021年'
  },
  {
    id: '4',
    title: '2020年'
  },
  {
    id: '5',
    title: '2019年'
  },
  {
    id: '6',
    title: '2018年'
  },
  {
    id: '7',
    title: '2017年'
  },
  {
    id: '8',
    title: '2016年'
  },
  {
    id: '9',
    title: '2015年'
  },
  {
    id: '10',
    title: '2014年'
  },
  {
    id: '11',
    title: '2013年'
  }
]

const SHClubPagePage = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Container className='py-16 flex flex-col gap-8'>
      <PageHeader title='セキュリティハウス会専用ページ／SH会情報' subtitle='トップ' />
      <section className='flex flex-col gap-8' id='minutes'>
        <SectionTitle title='議事録' bar={true} divider={true} />
        <div className={`inline-block md:hidden ${isOpen && 'change'}`} onClick={handleMenu}>
          <div className='bar1'></div>
          <div className='bar2'></div>
          <div className='bar3'></div>
        </div>
        <div className='relative flex items-start gap-10'>
          <div
            className={`absolute top-0 left-0 z-10 h-full bg-white shadow-xl rounded-lg md:p-0 md:shadow-none md:relative overflow-hidden ${
              isOpen ? 'max-w-full px-4 py-6 border border-colorGray1 md:border-none' : 'max-w-0 md:max-w-none'
            }`}
          >
            <Category categories={categories} toggleMenu={handleMenu} />
          </div>
          <div className='md:w-[calc(100%-246px)] flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <h5>2024.03.01</h5>
              <DocCardButton title='タイトルが入ります。タイトルが入ります。' file='' size='lg' />
            </div>
            <div className='flex flex-col gap-1'>
              <h5>2024.03.01</h5>
              <DocCardButton title='タイトルが入ります。タイトルが入ります。' file='' size='lg' />
            </div>
            <div className='flex flex-col gap-1'>
              <h5>2024.03.01</h5>
              <DocCardButton title='タイトルが入ります。タイトルが入ります。' file='' size='lg' />
            </div>
          </div>
        </div>
      </section>
      <section className='flex flex-col gap-8' id='rules'>
        <SectionTitle title='SH会会則' bar={true} divider={true} />
        <DocCardButton title='SH会会則' file='' size='lg' />
      </section>
    </Container>
  )
}

export default SHClubPagePage
