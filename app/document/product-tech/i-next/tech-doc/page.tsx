'use client'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'

const DocumentTechDocPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='技術資料' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='設定方法（カメラ）' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton
            title='【改定2023】iPRO社製ネットワークカメラへのユーザー指定DDNS設定方法2023.11.20'
            size='lg'
          />
          <DocCardButton title='SDカード録画再生機能設定' size='lg' />
          <DocCardButton title='フレームレート設定' size='lg' />
          <DocCardButton title='ユーザー指定DDNS利用' size='lg' />
          <DocCardButton title='ユーザー指定DDNS設定' size='lg' />
          <DocCardButton title='デジタル出力・リブータ外部制御' size='lg' />
          <DocCardButton title='ユーザー管理者設定' size='lg' />
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='設定方法（ネットワーク）' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton title='IPv6アドレスのポート開放調査方法について　2021.3.11' size='lg' />
          <DocCardButton title='明京電機製リブーター設定' size='lg' />
        </div>
      </section>
    </Container>
  )
}

export default DocumentTechDocPage
