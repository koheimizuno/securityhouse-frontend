'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'

import SectionTitle from '@/components/common/SectionTitle'

import { validateEmail } from '@/utils/validateUtils'
import { getUserByIdAction } from '@/actions/authAction'
import { UsersType } from '@/types/userType'
import { editUserAction } from '@/redux-store/slices/authSlice'
import { useToggle } from '@uidotdev/usehooks'
import CheckBox from '@/components/form/CheckBox'
import { Button, Input } from '@nextui-org/react'

const EmailEditContent = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [userData, setUserData] = useState<Pick<UsersType, 'email'>>({ email: '' })
  const [email, setEmail] = useState({ new: '' })
  const [errors, setErrors] = useState({ new: '' })
  const [commetNot, setCommetNot] = useToggle(false)
  const [newsNot, setNewsNot] = useToggle(false)
  const [dmNot, setDmNot] = useToggle(false)

  useEffect(() => {
    if (typeof id === 'string') {
      const fetchUserData = async () => {
        try {
          const data = await getUserByIdAction(id)
          setUserData(data)
          setCommetNot(data.comment_not === '1' ? false : true)
          setNewsNot(data.news_not === '1' ? false : true)
          setDmNot(data.dm_not === '1' ? false : true)
        } catch (error) {
          console.error('Error fetching user:', error)
        }
      }
      fetchUserData()
    }
  }, [id])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmail(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }, [])

  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target

    const payload = checked === true ? '0' : '1'

    switch (name) {
      case 'comment_not':
        setCommetNot(checked)
        dispatch(editUserAction({ comment_not: payload }))
        break
      case 'news_not':
        setNewsNot(checked)
        dispatch(editUserAction({ news_not: payload }))
        break
      case 'dm_not':
        setDmNot(checked)
        dispatch(editUserAction({ dm_not: payload }))
        break
      default:
        break
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.new || !validateEmail(email.new)) {
      setErrors(prev => ({
        ...prev,
        new: '有効なメールアドレスを入力してください'
      }))
      return
    }
    dispatch(editUserAction({ email: email.new }))
  }

  return (
    <>
      <SectionTitle title='メールアドレス変更' />
      <form className='mt-4 flex flex-col gap-8' onSubmit={handleSubmit}>
        <Input
          type='text'
          name='current'
          label='現在のメールアドレス'
          placeholder={userData.email}
          className='font-bold'
          labelPlacement='outside'
          disabled
          size='lg'
          isRequired
        />
        <Input
          name='new'
          label='変更後のメールアドレス'
          placeholder='aaaaa@aaa.aa'
          className='font-bold'
          labelPlacement='outside'
          isInvalid={errors.new ? true : false}
          color={errors.new ? 'danger' : 'default'}
          errorMessage={errors.new}
          onChange={handleChange}
          size='lg'
          isRequired
        />
        <SectionTitle title='メール通知' />
        <ul className='flex flex-col gap-2'>
          <li
            className='flex justify-between items-center gap-2 bg-colorGray1 rounded-lg
           px-6 py-3'
          >
            <span>コメント</span>
            <CheckBox name='comment_not' on={commetNot} handleToggle={handleCheckboxChange} />
          </li>
          <li
            className='flex justify-between items-center gap-2 bg-colorGray1 rounded-lg
           px-6 py-3'
          >
            <span>管理者からのお知らせ</span>
            <CheckBox name='news_not' on={newsNot} handleToggle={handleCheckboxChange} />
          </li>
          <li
            className='flex justify-between items-center gap-2 bg-colorGray1 rounded-lg
           px-6 py-3'
          >
            <span>ダイレクトメッセージ</span>
            <CheckBox name='dm_not' on={dmNot} handleToggle={handleCheckboxChange} />
          </li>
        </ul>
        <Button type='submit' size='lg' color='primary' className='rounded-full'>
          保存
        </Button>
      </form>
    </>
  )
}

export default EmailEditContent
