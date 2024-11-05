'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import SectionTitle from '@/components/common/SectionTitle'

import { validateEmail } from '@/utils/validateUtils'
import { UsersType } from '@/types/userType'
import { editUserAction } from '@/redux-store/slices/authSlice'
import { useToggle } from '@uidotdev/usehooks'
import CheckBox from '@/components/form/CheckBox'
import { Button, Input } from '@nextui-org/react'

const EmailEditContent = ({ userData }: { userData: UsersType | null }) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState({ new: '' })
  const [errors, setErrors] = useState({ new: '' })
  const [commentNot, setCommentNot] = useToggle(false)
  const [newsNot, setNewsNot] = useToggle(false)
  const [dmNot, setDmNot] = useToggle(false)

  useEffect(() => {
    if (userData) {
      const isCommentNotified = userData.comment_not ? false : true
      const isNewsNotified = userData.news_not ? false : true
      const isDmNotified = userData.dm_not ? false : true

      setCommentNot(isCommentNotified)
      setNewsNot(isNewsNotified)
      setDmNot(isDmNotified)
    }
  }, [setCommentNot, setDmNot, setNewsNot, userData])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmail(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }, [])

  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target

    const payload = checked === true ? 0 : 1

    switch (name) {
      case 'comment_not':
        setCommentNot(checked)
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
    <div className='flex flex-col gap-8'>
      <SectionTitle title='メールアドレス変更' bar={true} />
      <form className='mt-4 flex flex-col gap-8' onSubmit={handleSubmit}>
        <Input
          type='text'
          name='current'
          label='現在のメールアドレス'
          className='font-bold'
          labelPlacement='outside'
          value={userData?.email}
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
            <CheckBox name='comment_not' on={commentNot} handleToggle={handleCheckboxChange} />
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
    </div>
  )
}

export default EmailEditContent
