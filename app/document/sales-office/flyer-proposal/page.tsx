'use client'

import { useState } from 'react'

import Category from '@/components/common/Category'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import Container from '@/components/layout/Container'
import ProductContent from '@/views/document/salesoffice/flyer-proposal/ProductContent'
import DataLink from '@/components/common/DataLink'
import { Divider } from '@nextui-org/react'
import SubSectionTitle from '@/components/common/SubSectionTitle'
import DangerInfo from '@/views/document/salesoffice/flyer-proposal/DangerInfo'

const categories = [
  {
    id: '1',
    title: '2024年',
    category_id: '2024'
  },
  {
    id: '1',
    title: '2023年',
    category_id: '2023'
  },
  {
    id: '2',
    title: '2022年',
    category_id: '2022'
  },
  {
    id: '3',
    title: '2021年',
    category_id: '2021'
  },
  {
    id: '4',
    title: '2020年',
    category_id: '2020'
  },
  {
    id: '5',
    title: '2019年',
    category_id: '2019'
  },
  {
    id: '6',
    title: '2018年',
    category_id: '2018'
  },
  {
    id: '7',
    title: '2017年',
    category_id: '2017'
  },
  {
    id: '8',
    title: '2016年',
    category_id: '2016'
  },
  {
    id: '8',
    title: '2015年',
    category_id: '2015'
  }
]

const DocumentProposalPage = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Container className='py-16 flex flex-col gap-8'>
      <PageHeader title='チラシ・提案書' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='商品展示会' bar={true} divider={true} />
        <div className={`inline-block md:hidden ${isOpen && 'change'}`} onClick={handleMenu}>
          <div className='bar1'></div>
          <div className='bar2'></div>
          <div className='bar3'></div>
        </div>
        <div className='relative py-8 flex items-start gap-10'>
          <div
            className={`absolute top-0 left-0 z-10 h-full bg-white shadow-xl rounded-lg md:p-0 md:shadow-none md:relative overflow-hidden ${
              isOpen ? 'max-w-full px-4 py-6 border border-colorGray1 md:border-none' : 'max-w-0 md:max-w-none'
            }`}
          >
            <Category categories={categories} toggleMenu={handleMenu} />
          </div>
          <ProductContent />
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='業界別チラシ・提案書' bar={true} divider={true} />
        <div className='flex flex-col gap-14'>
          <div className='flex flex-col gap-4'>
            <SubSectionTitle title='チラシ' />
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5'>
              <DataLink title='i-NEXT' href='flyer-proposal/i-next' />
              <DataLink title='外周警備システム' href='flyer-proposal/security-system' />
              <DataLink title='カメラシステム' href='flyer-proposal/camera-system' />
              <DataLink title='超防犯' href='flyer-proposal/super-security' />
              <DataLink title='自主機器警備システム' href='flyer-proposal/self-maintenance-system' />
              <DataLink title='強盗対策' href='flyer-proposal/robbery-measure' />
            </ul>
            <Divider className='my-8' />
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5'>
              <DataLink title='一般家庭・マンション向け' href='/' />
              <DataLink title='工場向け' href='/' />
              <DataLink title='病院・福祉・障碍者施設向け' href='/' />
              <DataLink title='事務所向け・店舗向け' href='flyer-proposal/office-store' />
              <DataLink title='教育施設・大学向け' href='/' />
              <DataLink title='物流・運送業向け' href='/' />
            </ul>
            <Divider className='my-8' />
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5'>
              <DataLink title='その他' href='/' />
            </ul>
          </div>
          <div className='flex flex-col gap-4'>
            <SubSectionTitle title='提案書' />
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5'>
              <DataLink title='提案書' href='/' />
            </ul>
          </div>
          <div className='flex flex-col gap-4'>
            <SubSectionTitle title='旧チラシ・カタログ' />
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5'>
              <DataLink title='旧チラシ・カタログ' href='/' />
            </ul>
          </div>
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='販売方法についての注意案内' bar={true} divider={true} />
        <DangerInfo />
      </section>
    </Container>
  )
}

export default DocumentProposalPage
