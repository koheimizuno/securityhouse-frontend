'use client'

import React, { useState, useEffect } from 'react'
import { Key } from '@react-types/shared'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import MainItem from '@/components/common/MainItem'
import Container from '@/components/layout/Container'
import SectionTitle from '@/components/common/SectionTitle'
import PageHeader from '@/components/common/PageHeader'
import { Button, Card, CardBody, CardHeader, CircularProgress, Tab, Tabs } from '@nextui-org/react'

import { UsersType } from '@/types/userType'
import { PostType } from '@/types/postType'
import { getUserByIdAction } from '@/actions/authAction'
import {
  getBmarkPostListAction,
  getMypageCommentPostListAction,
  getMypageLikePostListAction,
  getMypagePostListAction
} from '@/actions/postAction'
import Loading from '@/components/common/Loading'
import { useAuthentication } from '@/hooks/AuthContext'
import { getImageAlt } from '@/utils/getImageAlt'

const MainItemContent = ({ data }: { data: PostType[] | null }) => {
  return (
    <ul className='flex flex-col gap-6 mt-5'>
      {data &&
        data
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .map(item => (
            <MainItem
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              category_name={item.category_name}
              user_id={item.user_id}
              user_name={item.name}
              affiliation_name={item.affiliation_name}
              thumbnail={item.thumbnail}
              nice_flag={item.nice_flag}
              like_count={item.like_count}
              bookmark_flag={item.bookmark_flag}
              created_at={item.created_at}
            />
          ))}
    </ul>
  )
}

const ProfilePage = () => {
  const { id } = useParams()
  const [userData, setUserData] = useState<UsersType | null>(null)
  const [selected, setSelected] = useState<Key>('post')
  const [myPagePostList, setMyPagePostList] = useState<PostType[] | null>(null)
  const [myPageCommentPostList, setMyPageCommentPostList] = useState<PostType[] | null>(null)
  const [myPageLikePostList, setMyPageLikePostList] = useState<PostType[] | null>(null)
  const [myPageBookmarkedPost, setMyPageBookmarkedPost] = useState<PostType[] | null>(null)
  const { session_user_id } = useAuthentication()

  useEffect(() => {
    if (typeof id === 'string') {
      getUserByIdAction(id).then(data => setUserData(data))
    }
  }, [id])

  useEffect(() => {
    switch (selected) {
      case 'post':
        getMypagePostListAction({ user_id: session_user_id }).then(data => setMyPagePostList(data))
        break
      case 'comment':
        getMypageCommentPostListAction({ user_id: session_user_id }).then(data => setMyPageCommentPostList(data))
        break
      case 'likedPost':
        getMypageLikePostListAction({ user_id: session_user_id }).then(data => setMyPageLikePostList(data))
        break
      case 'bookmarkedPost':
        getBmarkPostListAction({ user_id: session_user_id }).then(data => setMyPageBookmarkedPost(data))
        break
      default:
        break
    }
  }, [selected, session_user_id])

  const handleSelectionChange = (key: Key) => {
    setSelected(key)
  }

  const tabs = [
    {
      id: 'post',
      label: '投稿',
      content: <MainItemContent data={myPagePostList} />,
      isLoading: !myPagePostList
    },
    {
      id: 'comment',
      label: 'コメント',
      content: <MainItemContent data={myPageCommentPostList} />,
      isLoading: !myPageCommentPostList
    },
    {
      id: 'likedPost',
      label: 'いいね',
      content: <MainItemContent data={myPageLikePostList} />,
      isLoading: !myPageLikePostList
    },
    {
      id: 'bookmarkedPost',
      label: 'ブックマーク',
      content: <MainItemContent data={myPageBookmarkedPost} />,
      isLoading: !myPageBookmarkedPost
    }
  ]

  return (
    <Container className='py-20 flex flex-col gap-12'>
      <PageHeader title='マイページ' subtitle='マイページ' />
      <section className='flex flex-col-reverse md:flex-row justify-between gap-4 md:gap-9 bg-bgSemiblue rounded-xl px-5 py-8 md:ps-9 md:pe-[60px] md:py-12'>
        <div className='w-full flex flex-col gap-2'>
          <div className='flex flex-col md:flex-row gap-9'>
            <Image
              src={userData?.thumbnail ? userData.thumbnail : '/images/icons/user-icon00.svg'}
              alt={(userData?.thumbnail && getImageAlt(userData.thumbnail)) || ''}
              className='object-contain w-10 h-10 md:w-[125px] md:h-[125px]'
              width={125}
              height={125}
              priority
            />
            <div className='flex flex-col gap-2'>
              <h2 className='text-xl font-bold'>
                {userData?.name}／{userData?.affiliation_name}
              </h2>
              <p className='text-xs'>{userData?.uid}</p>
              <p>{userData?.intro}</p>
            </div>
          </div>
        </div>
        {/* {session_user_id === id && ( */}
        <div className='flex justify-end'>
          <Link href={`/profile/edit/${id}`}>
            <Button color='primary' className='rounded-full' size={window.innerWidth > 768 ? 'md' : 'sm'}>
              アカウント設定
            </Button>
          </Link>
        </div>
        {/* )} */}
      </section>
      <section className='flex flex-col gap-4'>
        <SectionTitle title='アクティビティ' icon='/images/icons/line-chart.svg' />
        <div className='flex flex-col md:flex-row gap-6 md:gap-10 p-1'>
          <Card className='border-none'>
            <CardHeader className='flex justify-between items-center px-3 py-2 border-none bg-[#eaeaea]'>
              <h3 className='text-sm font-bold'>ポイント</h3>
              <Link href='#' className='text-xs underline hover:text-primary'>
                詳細
              </Link>
            </CardHeader>
            <CardBody className='justify-center items-center'>
              <CircularProgress
                classNames={{
                  svg: 'w-[200px] h-[200px] drop-shadow-md',
                  indicator: 'stroke-secondary',
                  value: 'text-3xl font-semibold'
                }}
                showValueLabel={true}
                strokeWidth={3}
                valueLabel={
                  <div className='flex flex-col items-center gap-3'>
                    <div className='flex flex-col items-center'>
                      <span className='font-bold'>{userData?.points}</span>
                      <span className='text-sm font-bold'>ポイント</span>
                    </div>
                    <div className='flex flex-col items-center'>
                      <span className='text-xs'>{`${userData?.ranking_name}まで`}</span>
                      <span className='text-xs'>{`${userData?.point_difference}ポイント`}</span>
                    </div>
                  </div>
                }
                value={userData?.points && (userData?.points / (userData?.points + userData?.point_difference)) * 100}
              />
            </CardBody>
          </Card>
          <Card className='border-none'>
            <CardHeader className='px-3 py-2 border-none bg-[#eaeaea]'>
              <h3 className='text-sm font-bold'>バッジ</h3>
            </CardHeader>
            <CardBody>
              <div className='w-full md:w-[200px] flex justify-center items-center gap-x-5 flex-wrap'>
                {userData?.badge_id.includes(1) && (
                  <div className='flex flex-col items-center'>
                    <Image src='/images/icons/badge-bronze.svg' alt='バッジ' width={80} height={80} />
                    <span className='text-xs font-bold text-center'>
                      ログイン30回
                      <br />
                      達成!
                    </span>
                  </div>
                )}
                {userData?.badge_id.includes(2) && (
                  <div className='flex flex-col items-center'>
                    <Image src='/images/icons/badge-silver.svg' alt='バッジ' width={80} height={80} />
                    <span className='text-xs font-bold text-center'>
                      ログイン100回
                      <br />
                      達成!
                    </span>
                  </div>
                )}
                {userData?.badge_id.includes(3) && (
                  <div className='flex flex-col items-center'>
                    <Image src='/images/icons/badge-gold.svg' alt='バッジ' width={80} height={80} />
                    <span className='text-xs font-bold text-center'>
                      投稿10回
                      <br />
                      達成!
                    </span>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
      <section>
        <SectionTitle title='投稿履歴' icon='/images/icons/talk-room.svg' />
        <Tabs
          aria-label='Options'
          radius='none'
          color='primary'
          className='mt-4 bg-white'
          size='lg'
          variant='light'
          selectedKey={selected as Key}
          onSelectionChange={handleSelectionChange}
        >
          {tabs.map(item => (
            <Tab key={item.id} title={item.label} className='text-sm md:text-base'>
              {item.isLoading ? <Loading flag='2' /> : item.content}
            </Tab>
          ))}
        </Tabs>
      </section>
    </Container>
  )
}

export default ProfilePage
