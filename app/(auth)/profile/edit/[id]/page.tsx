'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import PageHeader from '@/components/common/PageHeader'
import Container from '@/components/layout/Container'
import TabVertical from '@/components/common/TabVertical'
import ProfileEditContent from '@/views/profile/ProfileEditContent'
import EmailEditContent from '@/views/profile/EmailEditContent'
import ChangePwContent from '@/views/profile/ChangePwContent'

import { PROFILE_TAB } from '@/utils/constants'
import { getUserByIdAction } from '@/actions/authAction'
import { UsersType } from '@/types/userType'

const ProfileEditPage = () => {
  const { id } = useParams()
  const searchParams = useSearchParams()
  const [profileTab, setProfileTab] = useState<string>('1')
  const [userData, setUserData] = useState<UsersType | null>(null)

  useEffect(() => {
    const profileTab = searchParams.get('profile_tab')
    if (profileTab) {
      setProfileTab(profileTab)
    }
  }, [searchParams])

  useEffect(() => {
    if (typeof id === 'string') {
      getUserByIdAction(id).then(data => {
        setUserData(data)
      })
    }
  }, [id])

  return (
    <Container className='py-16 flex flex-col gap-8'>
      <PageHeader title='アカウント設定' className='text-center' />
      <TabVertical queryKey='profile_tab' menuList={PROFILE_TAB} gap={true}>
        <div className='w-full lg:w-[calc(100%-300px)] lg:px-10 pb-7  rounded-xl rounded-tl-none'>
          {profileTab === '1' && <ProfileEditContent userData={userData} />}
          {profileTab === '2' && <EmailEditContent userData={userData} />}
          {profileTab === '3' && <ChangePwContent />}
        </div>
      </TabVertical>
    </Container>
  )
}

export default ProfileEditPage
