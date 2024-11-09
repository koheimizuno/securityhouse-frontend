'use client'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'

const DocumentVideoOrderFormPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-20'>
      <PageHeader title='販促注文書／パネル' subtitle='資料集' />
      <section className='flex flex-col gap-6'>
        <SectionTitle title='セキュリティハウス販促ツール一覧表' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton title='セキュリティハウス販促ツール一覧表（2023年12月7日現在）' file='' size='lg' />
          <DocCardButton title='セキュリティハウス販促ツール　一部価格改定のお知らせ' file='' size='lg' />
        </div>
      </section>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='各種注文書' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton title='SH専用各種カタログお申込書①' file='' size='lg' />
          <DocCardButton title='SH専用各種カタログお申込書②' file='' size='lg' />
        </div>
      </section>
    </Container>
  )
}

export default DocumentVideoOrderFormPage
