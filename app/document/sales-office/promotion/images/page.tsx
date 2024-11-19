'use client'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocumentCard from '@/views/document/DocumentCard'

const DocumentVideoImagesPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-20'>
      <PageHeader title='ロゴ／イラスト／バナー素材' subtitle='資料集' />
      <section className='flex flex-col gap-6'>
        <SectionTitle title='くらし守るバナー' bar={true} divider={true} />
        <DocumentCard title='くらし守るバナー' img='/images/doc-office-img01.png' attachment='' />
      </section>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='リクルート用バナー' bar={true} divider={true} />
        <DocumentCard title='リクルート用バナー' img='/images/doc-office-img02.png' attachment='' />
      </section>
    </Container>
  )
}

export default DocumentVideoImagesPage
