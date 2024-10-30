'use client'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

const DocumentVideoPhotosPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-12'>
      <PageHeader title='設置写真' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='パネルデザインについて' bar={true} divider={true} />
        <ul className='flex flex-col gap-2'>
          <li>・レンタルは貸出規約をご確認の上「パネル貸出申込書」のFAXをお願いします。</li>
          <li>
            ・ご購入は「パネル購入申込書」に記入の上、FAXをお願いします。納期、費用についてはお問い合わせください。
          </li>
        </ul>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='FAX申込書' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton title='パネル貸出申込書（PDF）' size='lg' />
          <DocCardButton title='パネル貸出申込書（LZH）' size='lg' />
          <DocCardButton title='パネル購入申込書（PDF）' size='lg' />
          <DocCardButton title='パネル購入申込書（LZH）' size='lg' />
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='どこでもカメラ' bar={true} divider={true} />
        <DocCardButton title='どこでもカメラ貸出について（販促用）' size='lg' />
        <p className='bg-bgSemiblue min-h-[300px] flex justify-center items-center'>貸出規約</p>
      </section>
      <Link href='photos/panel' className='text-center'>
        <Button color='primary' className='rounded-full' size='lg'>
          パネル一覧
        </Button>
      </Link>
    </Container>
  )
}

export default DocumentVideoPhotosPage
