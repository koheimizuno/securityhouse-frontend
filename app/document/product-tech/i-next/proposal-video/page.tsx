'use client'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'

const DocumentProposalVideoPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='提案書／動画' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='プレゼン資料' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton title='エンドユーザー様向けプレゼン資料' size='lg' />
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='提案書' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton title='(新)工場向け-i-NEXTご提案書' size='lg' />
          <DocCardButton title='(新)工場向け-i-NEXTご提案書（PPT)' size='lg' />
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='プレゼン資料' bar={true} divider={true} />
        <p> i-NEXT関連ビデオ　動画ページはこちらから ＞＞</p>
      </section>
    </Container>
  )
}

export default DocumentProposalVideoPage
