'use client'

import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import Container from '@/components/layout/Container'
import Image from 'next/image'
import Link from 'next/link'

const SitemapPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='サイトマップ' subtitle='トップ' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='トークルーム' bar={true} divider={true} />
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          <Link href='/chatroom/sh-room' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>SH会ルーム</span>
          </Link>
          <Link href='/chatroom/work-room' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>仕事ルーム</span>
          </Link>
          <Link href='/chatroom/exchange-room' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>交流ルーム</span>
          </Link>
          <Link href='/chatroom/boss-room' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>社長室ルーム</span>
          </Link>
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='資料集' bar={true} divider={true} />
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          <Link href='/document/sales-office/flyer-proposal' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>チラシ・提案書</span>
          </Link>
          <Link href='/document/sales-office/video' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>動画</span>
          </Link>
          <Link href='/document/product-tech/sh-brand' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>SHブランド</span>
          </Link>
          <Link href='/document/product-tech/security-net' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>セキュリネット</span>
          </Link>
          <Link href='/document/sales-office/promotion' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>販促物</span>
          </Link>
          <Link href='/document/sales-office/document-system' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>書類関係</span>
          </Link>
          <Link href='/document/product-tech/takex-brand' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>TAKEXブランド</span>
          </Link>
          <Link href='/document/product-tech/i-next' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>i-NEXT</span>
          </Link>
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='お知らせ' bar={true} divider={true} />
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          <Link href='/news' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>お知らせ</span>
          </Link>
          <Link href='/news' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>バックナンバー</span>
          </Link>
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='セキュリティハウス会専用ページ' bar={true} divider={true} />
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          <Link href='/sh-club#minutes' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>議事録</span>
          </Link>
          <Link href='/sh-club#rules' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>ＳＨ会会訓</span>
          </Link>
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='マイページ' bar={true} divider={true} />
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          <Link href='/profile/edit/1' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>アカウント設定</span>
          </Link>
          <Link href='/chatroom/post/bookmark' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>ブックマーク</span>
          </Link>
          <Link href='/dm' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>ダイレクトメッセージ</span>
          </Link>
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='その他機能' bar={true} divider={true} />
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          <Link href='/' className='flex items-center gap-3'>
            <Image
              src='/images/icons/arrow-right-secondary.svg'
              alt='arrow-right-secondary.svg'
              width={10}
              height={5}
            />
            <span>通知機能</span>
          </Link>
        </div>
      </section>
    </Container>
  )
}

export default SitemapPage
