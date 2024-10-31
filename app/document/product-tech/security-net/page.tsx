'use client'

import DataLink from '@/components/common/DataLink'
import PageHeader from '@/components/common/PageHeader'
import Container from '@/components/layout/Container'

const DocumentSecurityNetPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='セキュリティネット' subtitle='資料集' />
      <ul className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
        <DataLink title='J-810SH' href='security-net/J-810SH' />
        <DataLink title='WJ-700SH/WJ-750SH' href='security-net/WJ-700SHWJ-750SH' />
      </ul>
    </Container>
  )
}

export default DocumentSecurityNetPage
