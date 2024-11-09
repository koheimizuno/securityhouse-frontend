'use client'

import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import SubSectionTitle from '@/components/common/SubSectionTitle'
import Container from '@/components/layout/Container'
import DocCardButton from '@/views/document/DocCardButton'

const DocumentJ810SHPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='J-810SH' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='QRコード／連絡先など' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <SubSectionTitle title='デモ用共通ＩＤ/パスワード' />
          <ul className='flex flex-col gap-4'>
            <li className='flex flex-col md:flex-row gap-1 md:gap-4'>
              <p className='w-[160px] font-bold'>ユーザー名</p>
              <p className='hidden md:block'>:</p>
              <p>snet2</p>
            </li>
            <li className='flex flex-col md:flex-row gap-1 md:gap-4'>
              <p className='w-[160px] font-bold'>ＩＤパスワード</p>
              <p className='hidden md:block'>:</p>
              <p>snet2</p>
            </li>
            <li className='flex flex-col md:flex-row gap-1 md:gap-4'>
              <p className='w-[160px] font-bold'>スマートフォン用</p>
              <p className='hidden md:block'>:</p>
              <p>https://shscenter.net/sns/</p>
            </li>
            <li className='flex flex-col md:flex-row gap-1 md:gap-4'>
              <p className='w-[160px] font-bold'>フィーチャーフォン用</p>
              <p className='hidden md:block'>:</p>
              <p>http://shscenter.net/sns/</p>
            </li>
          </ul>
        </div>
        <div className='flex flex-col gap-4'>
          <SubSectionTitle title='サーバー通報先' />
          <ul className='flex flex-col gap-4'>
            <li className='flex flex-col md:flex-row gap-1 md:gap-4'>
              <p className='w-[160px] font-bold'>アナログ回線</p>
              <p className='hidden md:block'>:</p>
              <p>075-574-7245</p>
            </li>
            <li className='flex flex-col md:flex-row gap-1 md:gap-4'>
              <p className='w-[160px] font-bold'>アナログ回線</p>
              <p className='hidden md:block'>:</p>
              <p>072-834-0320</p>
            </li>
            <li className='flex flex-col md:flex-row gap-1 md:gap-4'>
              <p className='w-[160px] font-bold'>ＩＰ回線</p>
              <p className='hidden md:block'>:</p>
              <p>202.238.241.220</p>
            </li>
            <li>
              <p>（アナログ回線について、できれば両方設定してください）</p>
            </li>
          </ul>
        </div>
        <div className='flex flex-col gap-4'>
          <SubSectionTitle title='接続ＵＲＬ' />
          <ul className='flex flex-col gap-4'>
            <li className='flex flex-col md:flex-row gap-1 md:gap-4'>
              <p className='w-[160px] font-bold'>ＳＨＳクライアント</p>
              <p className='hidden md:block'>:</p>
              <p>https://shscenter.net/sns/</p>
            </li>
            <li className='flex flex-col md:flex-row gap-1 md:gap-4'>
              <p>※自動判別のため、タブレットやスマートフォンではログインできません。</p>
            </li>
            <li className='flex flex-col md:flex-row gap-1 md:gap-4'>
              <p className='w-[160px] font-bold'>メール送信元アドレス</p>
              <p className='hidden md:block'>:</p>
              <p>securinet@shscenter.net</p>
            </li>
          </ul>
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='機器取扱説明書' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <DocCardButton
            title='J-810SH PC登録器マニュアルV1029以降（セキュリネット登録編）2020.9.28更新'
            file=''
            size='lg'
          />
          <DocCardButton title='J-810SH工事マニュアル_150424' file='' size='lg' />
        </div>
      </section>
    </Container>
  )
}

export default DocumentJ810SHPage
