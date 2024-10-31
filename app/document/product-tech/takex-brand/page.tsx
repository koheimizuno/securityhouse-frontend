'use client'

import DataLink from '@/components/common/DataLink'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import Container from '@/components/layout/Container'
import DocCardButton from '@/views/document/DocCardButton'

const DocumentTAKEXBrandPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='TAKEXブランド' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <p className='min-h-[293px] bg-bgSemiblue flex justify-center items-center'>TAKEXブランドはこちら</p>
        <ul className='grid grid-cols-2 gap-8'>
          <DataLink title='テクニカルレポート' href='takex-brand/tech-report' />
          <DataLink title='防犯工事トクトク情報' href='takex-brand/security-construct' />
        </ul>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='感圧コードセンサ技術資料' bar={true} divider={true} />
        <DocCardButton title='感圧コードセンサ技術資料' size='lg' />
      </section>
    </Container>
  )
}

export default DocumentTAKEXBrandPage
