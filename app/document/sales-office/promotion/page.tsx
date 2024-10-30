'use client'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import DataLink from '@/components/common/DataLink'

const DocumentPromotion = () => {
  return (
    <Container className='py-16 flex flex-col gap-12'>
      <PageHeader title='営業・事務' subtitle='資料集' />
      <ul className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
        <DataLink title='ロゴ／イラスト／バナー／ステッカー画像' href='promotion/images' />
        <DataLink title='販促注文書／パネル' href='promotion/order-form' />
        <DataLink title='設置写真' href='promotion/photos' />
        <DataLink title='川口能活素材集' href='promotion/materials' />
      </ul>
    </Container>
  )
}

export default DocumentPromotion
