'use client'

import DataLink from '@/components/common/DataLink'
import PageHeader from '@/components/common/PageHeader'
import Container from '@/components/layout/Container'

const DocumentDocumentsPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-20'>
      <PageHeader title='ロゴ／イラスト／バナー素材' subtitle='資料集' />
      <ul className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
        <DataLink title='書類' href='document-system/documentation' />
        <DataLink title='報告書フォーマット' href='document-system/report-formats' />
      </ul>
    </Container>
  )
}

export default DocumentDocumentsPage
