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
import { Button, Tab, Tabs } from '@nextui-org/react'

import { UsersType } from '@/types/userType'
import { PostType } from '@/types/postType'
import { getUserByIdAction } from '@/actions/authAction'
import {
  getMypageBmarkPostListAction,
  getMypageCommentPostListAction,
  getMypageLikePostListAction,
  getMypagePostListAction
} from '@/actions/postAction'
import Loading from '@/components/common/Loading'
import { useAuthentication } from '@/hooks/AuthContext'

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
        getMypageBmarkPostListAction({ user_id: session_user_id }).then(data => setMyPageBookmarkedPost(data))
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
      <section className='bg-bgSemiblue rounded-xl ps-9 pe-[60px] py-12 flex justify-between gap-9'>
        <div>
          <Image
            src='/images/icons/user-icon00.svg'
            alt='user-icon00'
            className='object-contain w-[125px] h-[125px]'
            width={125}
            height={125}
            priority
          />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-xl font-bold'>
                {userData?.name}／{userData?.affiliation_name}
              </h2>
              <p className='text-xs'>@{userData?.uid}</p>
            </div>
            <Link href={`/profile/edit/${id}`}>
              <Button color='primary' className='rounded-full'>
                アカウント設定
              </Button>
            </Link>
          </div>
          <p>{userData?.intro}</p>
        </div>
      </section>
      <section>
        <SectionTitle title='アクティビティ' icon='/images/icons/line-chart.svg' />
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
            <Tab key={item.id} title={item.label}>
              {item.isLoading ? <Loading flag='2' /> : item.content}
            </Tab>
          ))}
        </Tabs>
      </section>
    </Container>
  )
}

export default ProfilePage
