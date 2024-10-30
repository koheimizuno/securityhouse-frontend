'use client'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'

const DocumentVideoPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-20'>
      <PageHeader title='営業・事務' subtitle='資料集' />
      <section className='flex flex-col gap-6'>
        <SectionTitle title='動画について' bar={true} divider={true} />
        <ul>
          <li>
            <p> ※ダウンロードされたムービーの再生にはWindowsMediaPlayer等が必要です。</p>
          </li>
          <li>
            <p> ※Facebook、YouTube等 共有サイトへの投稿はお控え下さいますようお願い致します。</p>
          </li>
        </ul>
      </section>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='セミナー動画' bar={true} divider={true} />
        <DocCardButton
          title='働き方改革(社労士ver)防犯商品展示会2018より'
          icon='/images/icons/youtube.svg'
          subicon='/images/icons/video-icon-circle.svg'
        />
      </section>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='プロモーション 動画' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton
            title='工場編'
            icon='/images/icons/youtube.svg'
            subicon='/images/icons/video-icon-circle.svg'
          />
          <DocCardButton
            title='お寺編'
            icon='/images/icons/youtube.svg'
            subicon='/images/icons/video-icon-circle.svg'
          />
        </div>
      </section>
    </Container>
  )
}

export default DocumentVideoPage
