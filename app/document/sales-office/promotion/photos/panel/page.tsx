'use client'

import { useState } from 'react'

import Category from '@/components/common/Category'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import Container from '@/components/layout/Container'
import DocumentCard from '@/views/document/DocumentCard'

const categories = [
  {
    id: '1',
    title: 'i-NEXT'
  },
  {
    id: '2',
    title: '自主機械警備パネル'
  }
]

const DocumentPhotosPanelPage = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='パネルデザイン一覧' subtitle='資料集' />
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
        <div className='md:w-[calc(100%-246px)] flex flex-col gap-8'>
          <SectionTitle title='商品展示会' bar={true} divider={true} />
          <div className='flex flex-col md:flex-row md:flex-wrap items-center gap-4'>
            <DocumentCard title='i-NEXT超防犯' img='/images/doc-office-img01.png' />
            <DocumentCard title='防犯のプロとしてのこだわり防犯魂' img='/images/doc-office-img02.png' />
            <DocumentCard title='どこでもカメラ' img='/images/doc-store-img01.png' />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default DocumentPhotosPanelPage
