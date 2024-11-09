'use client'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import NewsItem from '@/views/news/NewsItem'
import MainItem from '@/components/common/MainItem'
import SubSectionTitle from '@/components/common/SubSectionTitle'
import DocCardButton from '@/views/document/DocCardButton'

const SearchPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='検索結果' subtitle='トップ' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='トークルーム' bar={true} divider={true} />
        <ul className='flex flex-col gap-4'>
          <NewsItem
            id={1}
            user_name='山田太郎'
            affiliation_name='所属名'
            thumbnail=''
            category_name='お知らせカテゴリー名'
            title='タイトルタイトルタイトル'
            content='投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります'
            bookmark_flag={true}
            created_at='2015-07-20T15:49:04-07:00'
          />
          <NewsItem
            id={1}
            user_name='山田太郎'
            affiliation_name='所属名'
            thumbnail=''
            category_name='お知らせカテゴリー名'
            title='タイトルタイトルタイトル'
            content='投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります'
            bookmark_flag={true}
            created_at='2015-07-20T15:49:04-07:00'
          />
          <NewsItem
            id={1}
            user_name='山田太郎'
            affiliation_name='所属名'
            thumbnail=''
            category_name='お知らせカテゴリー名'
            title='タイトルタイトルタイトル'
            content='投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります'
            bookmark_flag={true}
            created_at='2015-07-20T15:49:04-07:00'
          />
        </ul>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='新着情報' bar={true} divider={true} />
        <ul className='flex flex-col gap-4'>
          <NewsItem
            id={1}
            user_name='山田太郎'
            affiliation_name='所属名'
            thumbnail=''
            category_name='お知らせカテゴリー名'
            title='タイトルタイトルタイトル'
            content='投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります'
            bookmark_flag={true}
            created_at='2015-07-20T15:49:04-07:00'
          />
          <NewsItem
            id={1}
            user_name='山田太郎'
            affiliation_name='所属名'
            thumbnail=''
            category_name='お知らせカテゴリー名'
            title='タイトルタイトルタイトル'
            content='投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります'
            bookmark_flag={true}
            created_at='2015-07-20T15:49:04-07:00'
          />
          <NewsItem
            id={1}
            user_name='山田太郎'
            affiliation_name='所属名'
            thumbnail=''
            category_name='お知らせカテゴリー名'
            title='タイトルタイトルタイトル'
            content='投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります'
            bookmark_flag={true}
            created_at='2015-07-20T15:49:04-07:00'
          />
        </ul>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='ユーザー' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <MainItem
            id={1}
            title='タイトルタイトルタイトル'
            content='投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります'
            name='山田太郎'
            affiliation_name='所属名'
            thumbnail='/images/icons/user-icon00.svg'
            bookmark_flag={true}
            created_at='2015-07-20T15:49:04-07:00'
          />
          <MainItem
            id={1}
            title='タイトルタイトルタイトル'
            content='投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります'
            name='山田太郎'
            affiliation_name='所属名'
            thumbnail='/images/icons/user-icon00.svg'
            bookmark_flag={true}
            created_at='2015-07-20T15:49:04-07:00'
          />
          <MainItem
            id={1}
            title='タイトルタイトルタイトル'
            content='投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります'
            name='山田太郎'
            affiliation_name='所属名'
            thumbnail='/images/icons/user-icon00.svg'
            bookmark_flag={true}
            created_at='2015-07-20T15:49:04-07:00'
          />
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='資料' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          <SubSectionTitle title='代理店／サポートショップ' />
          <div className='flex flex-col gap-2'>
            <DocCardButton title='フルコミ契約書' file='' size='lg' />
            <DocCardButton title='フルコミ誓約書' file='' size='lg' />
            <DocCardButton title='身元保証書' file='' size='lg' />
            <DocCardButton title='サポートショップ募集用チラシ' file='' size='lg' />
            <DocCardButton title='サポートショップ仲介契約書' file='' size='lg' />
            <DocCardButton title='個人サポートショップ用チラシ' file='' size='lg' />
          </div>
        </div>
      </section>
    </Container>
  )
}

export default SearchPage
