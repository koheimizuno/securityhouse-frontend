'use client'

import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import Container from '@/components/layout/Container'

const DocumentProposal = () => {
  return (
    <Container className='py-16 flex flex-col gap-8'>
      <PageHeader title='チラシ・提案書' subtitle='資料集' />
      <section>
        <SectionTitle title='商品展示会' bar />
      </section>
    </Container>
  )
}

export default DocumentProposal
