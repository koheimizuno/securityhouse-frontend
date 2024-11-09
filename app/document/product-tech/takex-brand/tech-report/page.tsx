'use client'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'

const DocumentTechReportPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='テクニカルレポート' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='テクニカルレポート' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton title='0000-00　　表紙' file='' size='lg' />
          <DocCardButton title='0000-01　　目次（0001～0025）' file='' size='lg' />
          <DocCardButton title='0000-02　　ENG、SHバージョン対照表' file='' size='lg' />
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='各種接続方法・配線図' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton title='0001　　バッテリーバックアップ時間の計算方法' file='' size='lg' />
          <DocCardButton title='0002　　接点保護について' file='' size='lg' />
          <DocCardButton title='0003　　事故と資格について' file='' size='lg' />
        </div>
      </section>
    </Container>
  )
}

export default DocumentTechReportPage
