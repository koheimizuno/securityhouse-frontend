'use client'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'

const DocumentContractDocPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='契約書関係書類' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='契約書関連書類' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton
            title='i-NEXT安心サポートサービス契約書（セキュリネット無　個人ユーザー）（2020.4改訂）'
            file=''
            size='lg'
          />
          <DocCardButton
            title='i-NEXT安心サポートサービス契約書（セキュリネット有　個人ユーザー）（2020.4改訂）'
            file=''
            size='lg'
          />
          <DocCardButton
            title='i-NEXT安心サポートサービス契約書（セキュリネット無　法人）（2020.4改訂）'
            file=''
            size='lg'
          />
          <DocCardButton
            title='i-NEXT安心サポートサービス契約書（セキュリネット有　法人）（2020.4改訂）'
            file=''
            size='lg'
          />
          <DocCardButton title='重要　「セキュリティ請負契約書」の改訂に関して' file='' size='lg' />
        </div>
      </section>
    </Container>
  )
}

export default DocumentContractDocPage
