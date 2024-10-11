'use client'

import React, { useState } from 'react'
import SectionTitle from '@/components/common/SectionTitle'
import InputText from '@/components/form/InputText'
import Button from '@/components/common/Button'

import { validateEmail } from '@/utils/validateUtils'

const EmailEditContent = () => {
  const [notifications, setNotifications] = useState({
    comments: false,
    adminAnnouncements: false,
    directMessages: false
  })

  const [email, setEmail] = useState({
    current: '',
    new: ''
  })
  const [errors, setErrors] = useState({
    new: ''
  })

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setNotifications(prev => ({ ...prev, [name]: checked }))
    console.log(`${name}: ${checked}`)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.new || !validateEmail(email.new)) {
      setErrors(prev => ({
        ...prev,
        new: '有効なメールアドレスを入力してください'
      }))
      return
    }
    console.log('submit', email)
  }

  return (
    <>
      <SectionTitle title='メールアドレス変更' />
      <form className='mt-4 flex flex-col gap-8' onSubmit={handleSubmit}>
        <label className='flex flex-col gap-2'>
          <span className='text-sm font-bold'>現在のメールアドレス</span>
          <InputText name='current' placeholder='aaaaa@aaa.aa' disabled={true} onChange={handleChange} />
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
                name='comments'
                className='sr-only peer'
                checked={notifications.comments}
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
                name='adminAnnouncements'
                className='sr-only peer'
                checked={notifications.adminAnnouncements}
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
                name='directMessages'
                className='sr-only peer'
                checked={notifications.directMessages}
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
