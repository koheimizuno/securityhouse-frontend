'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'

import MainItem from '@/components/common/MainItem'
import Container from '@/components/layout/Container'
import SectionTitle from '@/components/common/SectionTitle'
import PageHeader from '@/components/common/PageHeader'

import { getUserByIdAction } from '@/actions/authAction'
import { UsersType } from '@/types/userType'
import { Button } from '@nextui-org/react'

const ProfilePage = () => {
  const { id } = useParams()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<string>('1')
  const [userData, setUserData] = useState<UsersType | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      if (typeof id === 'string') {
        try {
          const data = await getUserByIdAction(id)
          setUserData(data)
        } catch (error) {
          console.error('Error fetching user:', error)
        }
      }
    }
    fetchUserData()
  }, [id])

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab) {
      setTab(tab)
    }
  }, [searchParams, id])

  const handleTab = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.getAttribute('data-value')
    if (value) {
      router.push(`${pathname}?tab=${value}`, { scroll: false })
    }
  }

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
              <h2 className='text-xl font-bold'>{userData?.name}／所属名</h2>
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
        <ul className='flex items-center gap-6 mt-5'>
          <li
            className={`px-4 py-2 cursor-pointer ${tab === '1' ? 'bg-primary text-white' : 'bg-white text-txtColor'}`}
            data-value='1'
            onClick={handleTab}
          >
            投稿
          </li>
          <li className='text-2xl'>|</li>
          <li
            className={`px-4 py-2 cursor-pointer ${tab === '2' ? 'bg-primary text-white' : 'bg-white text-txtColor'}`}
            data-value='2'
            onClick={handleTab}
          >
            コメント
          </li>
          <li className='text-2xl'>|</li>
          <li
            className={`px-4 py-2 cursor-pointer ${tab === '3' ? 'bg-primary text-white' : 'bg-white text-txtColor'}`}
            data-value='3'
            onClick={handleTab}
          >
            いいね
          </li>
          <li className='text-2xl'>|</li>
          <li
            className={`px-4 py-2 cursor-pointer ${tab === '4' ? 'bg-primary text-white' : 'bg-white text-txtColor'}`}
            data-value='4'
            onClick={handleTab}
          >
            ブックマーク
          </li>
        </ul>
        <ul className='flex flex-col gap-6 mt-5'>
          <MainItem
            id={1}
            name='山田太郎'
            thumbnail='/images/icons/user-icon00.svg'
            affiliation_name='所属名'
            title='タイトルタイトルタイトル'
            content='投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ'
            bookmark_flag={true}
            created_at='2024年6月11日 14:30'
          />
        </ul>
      </section>
    </Container>
  )
}

export default ProfilePage
