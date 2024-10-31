'use client'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'

const DocumentRegistrationPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='登録関係' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='登録関係' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton title='ネットワークカメラ（Panasonic（iPRO）製）遷移表＆iNEXT対応表　2023.8.4' size='lg' />
          <DocCardButton title='WV-X4171動作検証' size='lg' />
          <DocCardButton title='i-NEXT Plusデータシートフォーマット ' size='lg' />
          <DocCardButton title='i-NEXTデータシートフォーマット ' size='lg' />
          <DocCardButton title='i-NEXTデータシートフォーマット 　記入例' size='lg' />
          <DocCardButton title='i-NEXTデータシートフォーマット 　送信方法' size='lg' />
          <DocCardButton title='ネットワークカメラ動作機能比較表' size='lg' />
          <DocCardButton title='Canonカメラ動作機能比較表' size='lg' />
          <DocCardButton title='i-NEXTインストール方法' size='lg' />
          <DocCardButton title='i-NEXT Plus　インストール方法' size='lg' />
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='その他　ご案内' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton title='Android版iNEXTアプリご利用の皆様へのご注意2021.9.24' size='lg' />
          <DocCardButton title='iNEXT PlusアプリでのAppleプッシュサービス終了について2020.09.10' size='lg' />
          <DocCardButton title='i-NEXTシステム有効期限更新について2019.12.27' size='lg' />
        </div>
      </section>
    </Container>
  )
}

export default DocumentRegistrationPage
