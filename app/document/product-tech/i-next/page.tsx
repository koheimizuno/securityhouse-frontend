'use client'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import DataLink from '@/components/common/DataLink'

const DocumentINextPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='i-NEXT' subtitle='資料集' />
      <ul className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
        <DataLink title='契約書関係書類' href='i-next/contract-doc' />
        <DataLink title='登録関係' href='i-next/registration' />
        <DataLink title='技術資料' href='i-next/tech-doc' />
        <DataLink title='提案書／動画' href='i-next/proposal-video' />
        <DataLink title='チラシ／掲載事例' href='i-next/flyer-casestudy' />
      </ul>
    </Container>
  )
}

export default DocumentINextPage
