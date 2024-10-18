'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'

import SectionTitle from '@/components/common/SectionTitle'
import InputText from '@/components/form/InputText'
import Button from '@/components/common/Button'

import { validateEmail } from '@/utils/validateUtils'
import { getUserAction } from '@/actions/authAction'
import { UsersType } from '@/types/userType'
import { editUserAction } from '@/redux-store/slices/authSlice'
import { useToggle } from '@uidotdev/usehooks'
import CheckBox from '@/components/form/CheckBox'

const EmailEditContent = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const [notifications, setNotifications] = useState({
    comment_not: false,
    news_not: false,
    dm_not: false
  })
  const [commetNot, setCommetNot] = useToggle(false)
  const [newsNot, setNewsNot] = useToggle(false)
  const [dmNot, setDmNot] = useToggle(false)

  const [email, setEmail] = useState({
    new: ''
  })
  const [errors, setErrors] = useState({
    new: ''
  })

  const [userData, setUserData] = useState<Pick<UsersType, 'email' | 'comment_not' | 'news_not' | 'dm_not'>>({
    email: '',
    comment_not: '0',
    news_not: '0',
    dm_not: '0'
  })

  const id = params.id

  useEffect(() => {
    if (typeof id === 'string') {
      const fetchUserData = async () => {
        const data = await getUserAction(id)
        setUserData(data)
        setNotifications({
          ...notifications,
          comment_not: data.comment_not,
          news_not: data.news_not,
          dm_not: data.dm_not
        })
      }

      fetchUserData()
    }
  }, [id])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setEmail(prev => ({ ...prev, [name]: value }))

      if (name === 'new') {
        if (!value) {
          setErrors(prev => ({
            ...prev,
            new: 'メールアドレスを入力してください'
          }))
        } else if (!validateEmail(value)) {
          setErrors(prev => ({
            ...prev,
            new: '有効なメールアドレスを入力してください'
          }))
        } else {
          setErrors(prev => ({ ...prev, new: '' }))
        }
      }
    },
    [validateEmail]
  )

  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    console.log(name)

    // setNotifications(prev => ({ ...prev, [name]: checked }))
    // switch (name) {
    //   case 'comment_not':
    //     dispatch(editUserAction({ comment_not: notifications.comment_not }))
    //     break
    //   case 'news_not':
    //     dispatch(editUserAction({ news_not: notifications.news_not }))
    //     break
    //   case 'dm_not':
    //     dispatch(editUserAction({ dm_not: notifications.dm_not }))
    //     break
    //   default:
    //     break
    // }
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
        <label className='flex flex-col gap-2'>
          <span className='text-sm font-bold'>現在のメールアドレス</span>
          <InputText name='current' placeholder={userData.email} disabled={true} onChange={() => {}} />
        </label>
        <label className='flex flex-col gap-2'>
          <span className='text-sm font-bold'>変更後のメールアドレス</span>
          <InputText name='new' placeholder='aaaaa@aaa.aa' onChange={handleChange} />
          {errors.new && <span className='text-danger text-sm'>{errors.new}</span>}
        </label>
        <SectionTitle title='メール通知' />
        <ul className='flex flex-col gap-2'>
          <li
            className='flex justify-between items-center gap-2 bg-colorGray1 rounded-lg
           px-6 py-3'
          >
            <span>コメント</span>
            <CheckBox on={commetNot} handleToggle={() => handleCheckboxChange} />
          </li>
          <li
            className='flex justify-between items-center gap-2 bg-colorGray1 rounded-lg
           px-6 py-3'
          >
            <span>管理者からのお知らせ</span>
            <CheckBox on={newsNot} handleToggle={() => handleCheckboxChange} />
          </li>
          <li
            className='flex justify-between items-center gap-2 bg-colorGray1 rounded-lg
           px-6 py-3'
          >
            <span>ダイレクトメッセージ</span>
            <CheckBox on={dmNot} handleToggle={() => handleCheckboxChange} />
          </li>
        </ul>
        <Button type='submit' size='lg' value='保存' />
      </form>
    </>
  )
}

export default EmailEditContent
