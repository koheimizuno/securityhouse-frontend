'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import SectionTitle from '@/components/common/SectionTitle'
import InputText from '@/components/form/InputText'
import Button from '@/components/common/Button'

import { validateEmail } from '@/utils/validateUtils'
import { toastHandler } from '@/utils/toastHander'
import { editUserAction, getUserAction } from '@/actions/authAction'
import { UsersType } from '@/types/userType'

const EmailEditContent = () => {
  const params = useParams()
  const [notifications, setNotifications] = useState({
    comment_not: false,
    news_not: false,
    dm_not: false
  })

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }

  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setNotifications(prev => ({ ...prev, [name]: checked }))
    if (name === 'comment_not') {
      const res = await editUserAction({ comment_not: notifications.comment_not })
      if (typeof res === 'object' && res !== null) {
        toastHandler(res.status, 'ユーザー情報の変更に成功しました。', 'サーバの問題でデータ取得に失敗しました。')
      }
    }
    if (name === 'news_not') {
      const res = await editUserAction({ news_not: notifications.news_not })
      if (typeof res === 'object' && res !== null) {
        toastHandler(res.status, 'ユーザー情報の変更に成功しました。', 'サーバの問題でデータ取得に失敗しました。')
      }
    }
    if (name === 'dm_not') {
      const res = await editUserAction({ dm_not: notifications.dm_not })
      if (typeof res === 'object' && res !== null) {
        toastHandler(res.status, 'ユーザー情報の変更に成功しました。', 'サーバの問題でデータ取得に失敗しました。')
      }
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
    const res = await editUserAction({ email: email.new })
    if (typeof res === 'object' && res !== null) {
      toastHandler(res.status, 'ユーザー情報の変更に成功しました。', 'サーバの問題でデータ取得に失敗しました。')
    }
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
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                name='comment_not'
                className='sr-only peer'
                checked={notifications.comment_not}
                onChange={handleCheckboxChange}
              />
              <div
                className="relative w-11 h-6 bg-gray-300 rounded-full peer 
                              peer-checked:bg-blue-600 peer-checked:after:translate-x-full 
                              after:content-[''] after:absolute after:top-0.5 after:left-0.5 
                              after:bg-white after:rounded-full after:h-5 after:w-5 
                              after:transition-all"
              ></div>
            </label>
          </li>
          <li
            className='flex justify-between items-center gap-2 bg-colorGray1 rounded-lg
           px-6 py-3'
          >
            <span>管理者からのお知らせ</span>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                name='news_not'
                className='sr-only peer'
                checked={notifications.news_not}
                onChange={handleCheckboxChange}
              />
              <div
                className="relative w-11 h-6 bg-gray-300 rounded-full peer 
                              peer-checked:bg-blue-600 peer-checked:after:translate-x-full 
                              after:content-[''] after:absolute after:top-0.5 after:left-0.5 
                              after:bg-white after:rounded-full after:h-5 after:w-5 
                              after:transition-all"
              ></div>
            </label>
          </li>
          <li
            className='flex justify-between items-center gap-2 bg-colorGray1 rounded-lg
           px-6 py-3'
          >
            <span>ダイレクトメッセージ</span>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                name='dm_not'
                className='sr-only peer'
                checked={notifications.dm_not}
                onChange={handleCheckboxChange}
              />
              <div
                className="relative w-11 h-6 bg-gray-300 rounded-full peer 
                              peer-checked:bg-blue-600 peer-checked:after:translate-x-full 
                              after:content-[''] after:absolute after:top-0.5 after:left-0.5 
                              after:bg-white after:rounded-full after:h-5 after:w-5 
                              after:transition-all"
              ></div>
            </label>
          </li>
        </ul>
        <Button type='submit' size='lg' value='保存' />
      </form>
    </>
  )
}

export default EmailEditContent
