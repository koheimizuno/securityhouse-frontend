import SectionTitle from '@/components/common/SectionTitle'
import Container from '@/components/layout/Container'
import AnnounceSmCard from '../announce/AnnounceSmCard'
import { Button } from '@nextui-org/react'
import Image from 'next/image'

const NewsSection = () => {
  return (
    <Container>
      <div className='flex flex-col gap-4 items-center md:flex-row md:items-start md:gap-[40px] xl:gap-[96px]'>
        <div className='flex flex-col justify-center items-start md:items-center gap-2 md:gap-6 w-full md:w-auto'>
          <SectionTitle title='新着情報' icon='/images/info-icon.svg' />
          <Button
            size='lg'
            color='primary'
            className='h-14 px-12 rounded-full font-bold'
            endContent={
              <Image
                src='/images/arrow-circle-right-outline.svg'
                alt='arrow-circle-right-outline'
                width={20}
                height={20}
                className={`w-6 h-6`}
              />
            }
          >
            一覧を見る
          </Button>
        </div>
        <div className='w-full md:hidden text-right'>
          <a href='#' className='underline font-bold'>
            一覧を見る
          </a>
        </div>
        <ul className='secondary-scroll flex flex-col items-center w-full h-[500px] md:h-[330px] overflow-y-scroll pr-6'>
          <AnnounceSmCard
            userName='山田太郎'
            userCompany='所属名'
            title='タイトルタイトルタイトル'
            description='投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ...'
            isBookmarked={false}
            onClickBookmark={() => {}}
            updatedAt='2024年6月11日 14:30'
          />
          <AnnounceSmCard
            userName='山田太郎'
            userCompany='所属名'
            title='タイトルタイトルタイトル'
            description='投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ...'
            isBookmarked={false}
            onClickBookmark={() => {}}
            updatedAt='2024年6月11日 14:30'
          />
          <AnnounceSmCard
            userName='山田太郎'
            userCompany='所属名'
            title='タイトルタイトルタイトル'
            description='投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ...'
            isBookmarked={false}
            onClickBookmark={() => {}}
            updatedAt='2024年6月11日 14:30'
          />
        </ul>
      </div>
    </Container>
  )
}

export default NewsSection
