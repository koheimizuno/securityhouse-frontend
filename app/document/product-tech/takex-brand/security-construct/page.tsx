'use client'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'

const DocumentSecurityConstructPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='防犯工事トクトク情報' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='各種接続方法・配線図' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton title='デジタルレコーダー DVR-M401/M801/M1601 ネットワーク接続手順' file='' size='lg' />
          <DocCardButton title='WJ-700SH「リバース無し」設定時の注意事項' file='' size='lg' />
          <DocCardButton title='映像記録装置の設置場所テクニック' file='' size='lg' />
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='とくとく情報～その2～' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton title='赤外線センサーPXBシリーズ角柱取付の注意事項について' file='' size='lg' />
          <DocCardButton title='AG-808T設置注意事項' file='' size='lg' />
          <DocCardButton title='SAS-2020ラジオ音声混入対策' file='' size='lg' />
        </div>
      </section>
    </Container>
  )
}

export default DocumentSecurityConstructPage
