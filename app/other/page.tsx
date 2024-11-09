'use client'

import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import Container from '@/components/layout/Container'
import DocCardButton from '@/views/document/DocCardButton'

const OtherPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='その他' subtitle='トップ' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='代理店／サポートショップ' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton title='フルコミ契約書' file='' size='lg' />
          <DocCardButton title='フルコミ誓約書' file='' size='lg' />
          <DocCardButton title='身元保証書' file='' size='lg' />
          <DocCardButton title='サポートショップ募集用チラシ' file='' size='lg' />
          <DocCardButton title='サポートショップ仲介契約書' file='' size='lg' />
          <DocCardButton title='個人サポートショップ用チラシ' file='' size='lg' />
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='見舞金制度' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton title='見舞金制度　盗難事故に関するご案内（H28.6.1）' file='' size='lg' />
          <DocCardButton title='見舞金制度　複数年契約廃止及び保険料値上げのご案内（H25.2.1）' file='' size='lg' />
          <DocCardButton title='見舞金制度　保険料値上げのご案内（H30.5.21）' file='' size='lg' />
          <DocCardButton title='見舞金制度マニュアル（2020.10改訂）' file='' size='lg' />
          <DocCardButton title='見舞金制度30万円チラシ' file='' size='lg' />
          <DocCardButton title='見舞金制度50万円チラシ' file='' size='lg' />
          <DocCardButton title='事故連絡書（見舞金制度）' file='' size='lg' />
        </div>
      </section>
    </Container>
  )
}

export default OtherPage
