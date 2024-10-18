'use client'

import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'

import SectionTitle from '@/components/common/SectionTitle'
import InputText from '@/components/form/InputText'
import Button from '@/components/common/Button'

import { getUserByIdAction } from '@/actions/authAction'
import { editUserAction } from '@/redux-store/slices/authSlice'

const ChangePwContent = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    current_pw: '',
    new_pw: '',
    new_pw_confirm: ''
  })
  const [errors, setErrors] = useState({
    current_pw: '',
    new_pw: '',
    new_pw_confirm: ''
  })

  const id = params.id

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
    setErrors(prevState => ({ ...prevState, [name]: '' }))
  }, [])

  const validateForm = async () => {
    let isValid = true,
      originUserData = {
        password: ''
      }
    const newErrors = { ...errors }

    if (formData.current_pw.length < 8) {
      newErrors.current_pw = '現在のパスワードは8文字以上である必要があります'
      isValid = false
    }

    if (typeof id === 'string') {
      originUserData = await getUserByIdAction(id)
    }

    if (formData.current_pw !== originUserData.password) {
      newErrors.current_pw = '現在のパスワードが正しくありません。'
      isValid = false
    }

    if (formData.new_pw.length < 8) {
      newErrors.new_pw = '新しいパスワードは8文字以上である必要があります'
      isValid = false
    }

    if (formData.new_pw !== formData.new_pw_confirm) {
      newErrors.new_pw_confirm = '新しいパスワードと確認用パスワードが一致しません'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (await validateForm()) {
      dispatch(editUserAction({ password: formData.new_pw }))
    }
  }

  return (
    <>
      <SectionTitle title='アカウント設定' />
      <form className='mt-4 flex flex-col gap-8' onSubmit={handleSubmit}>
        <label className='flex flex-col gap-2'>
          <span className='text-sm font-bold'>現在のパスワード</span>
          <InputText type='password' name='current_pw' placeholder='現在のパスワードを入力' onChange={handleChange} />
          {errors.current_pw && <span className='text-danger text-sm'>{errors.current_pw}</span>}
        </label>
        <label className='flex flex-col gap-2'>
          <span className='text-sm font-bold'>変更後のパスワード</span>
          <InputText type='password' name='new_pw' placeholder='変更後のパスワードを入力' onChange={handleChange} />
          {errors.new_pw && <span className='text-danger text-sm'>{errors.new_pw}</span>}
        </label>
        <label className='flex flex-col gap-2'>
          <span className='text-sm font-bold'>変更後のパスワード（確認）</span>
          <InputText
            type='password'
            name='new_pw_confirm'
            placeholder='変更後のパスワード（確認）を入力'
            onChange={handleChange}
          />
          {errors.new_pw_confirm && <span className='text-danger text-sm'>{errors.new_pw_confirm}</span>}
        </label>
        <Button type='submit' size='lg' value='保存する' />
      </form>
    </>
  )
}

export default ChangePwContent
