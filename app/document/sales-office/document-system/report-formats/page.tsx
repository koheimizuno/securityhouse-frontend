'use client'

import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import Container from '@/components/layout/Container'
import DocCardButton from '@/views/document/DocCardButton'

const DocumentReportFormatsPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-20'>
      <PageHeader title='報告書フォーマット' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='報告書フォーマット' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton title='作業報告書' file='' size='lg' />
          <DocCardButton title='保守点検報告書' file='' size='lg' />
          <DocCardButton title='出張作業経費計算表' file='' size='lg' />
          <DocCardButton title='完了検査報告書' file='' size='lg' />
          <DocCardButton title='工事指示書' file='' size='lg' />
          <DocCardButton title='現場チェックリスト' file='' size='lg' />
          <DocCardButton title='監視カメラ装置設置報告書' file='' size='lg' />
          <DocCardButton title='防犯カメラ点検報告書フォーム' file='' size='lg' />
        </div>
      </section>
    </Container>
  )
}

export default DocumentReportFormatsPage
