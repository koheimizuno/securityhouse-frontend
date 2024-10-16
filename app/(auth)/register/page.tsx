'use client'

import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

import Container from '@/components/layout/Container'
import InputText from '@/components/form/InputText'
import SelectText from '@/components/form/SelectText'
import Button from '@/components/common/Button'
import PageHeader from '@/components/common/PageHeader'

import { validateEmail } from '@/utils/validateUtils'
import { registerAction } from '@/redux-store/slices/authSlice'

const roleOptions = [
  { label: '選択してください', value: '0' },
  { label: '役割1', value: '1' },
  { label: '役割2', value: '2' },
  { label: '役割3', value: '3' }
]

const groupsOptions = [
  { label: '選択してください', value: '0' },
  { label: 'グループ1', value: '1' },
  { label: 'グループ2', value: '2' },
  { label: 'グループ3', value: '3' }
]

const Register = () => {
  const [formData, setFormData] = useState({
    uid: '',
    email: '',
    role_id: '0',
    group_id: '0',
    password: '',
    passwordConfirm: ''
  })
  const [errors, setErrors] = useState({
    uid: '',
    email: '',
    role: '',
    groups: '',
    password: '',
    passwordConfirm: ''
  })
  const dispatch = useDispatch()

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors({ ...errors, [name]: '' })
  }, [])

  const handleSelect = useCallback((name: string, value: string) => {
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
  }, [])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.uid) newErrors.uid = 'IDは必須です'
    if (!formData.email) newErrors.email = 'メールアドレスは必須です'
    else if (!validateEmail(formData.email)) newErrors.email = '有効なメールアドレスを入力してください'
    if (formData.role_id === '0') newErrors.role = '選択してください'
    if (formData.group_id === '0') newErrors.groups = '選択してください'
    if (!formData.password) newErrors.password = 'パスワードは必須です'
    else if (formData.password.length < 8) newErrors.password = 'パスワードは8文字以上である必要があります'
    if (formData.password !== formData.passwordConfirm) newErrors.passwordConfirm = 'パスワードが一致しません'

    setErrors(prevErrors => ({ ...prevErrors, ...newErrors }))
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      const { passwordConfirm, ...refineData } = formData
      dispatch(registerAction(refineData))
    }
  }

  return (
    <Container className='py-20'>
      <form className='flex flex-col gap-8 max-w-[450px] m-auto' onSubmit={handleSubmit}>
        <PageHeader title='新規登録' className='text-center' />
        <label className='flex flex-col gap-2'>
          <span className='text-sm font-bold'>ID</span>
          <InputText name='uid' onChange={handleChange} placeholder='ID' />
          {errors.uid && <span className='text-danger text-sm'>{errors.uid}</span>}
        </label>
        <label className='flex flex-col gap-2'>
          <span className='text-sm font-bold'>メールアドレス</span>
          <InputText name='email' onChange={handleChange} placeholder='メールアドレス' />
          {errors.email && <span className='text-danger text-sm'>{errors.email}</span>}
        </label>
        <label className='flex flex-col gap-2'>
          <span className='text-base font-bold'>役割</span>
          <SelectText
            options={roleOptions}
            value={formData.role_id}
            onChange={handleSelect}
            placeholder={roleOptions[0].label}
            name='role_id'
          />
          {errors.role && <span className='text-danger text-sm'>{errors.role}</span>}
        </label>
        <label className='flex flex-col gap-2'>
          <span className='text-base font-bold'>グループ</span>
          <SelectText
            options={groupsOptions}
            value={formData.group_id}
            onChange={handleSelect}
            placeholder={groupsOptions[0].label}
            name='group_id'
          />
          {errors.groups && <span className='text-danger text-sm'>{errors.groups}</span>}
        </label>
        <label className='flex flex-col gap-2'>
          <span className='text-sm font-bold'>パスワード</span>
          <InputText name='password' type='password' onChange={handleChange} placeholder='パスワード' />
          {errors.password && <span className='text-danger text-sm'>{errors.password}</span>}
        </label>
        <label className='flex flex-col gap-2'>
          <span className='text-sm font-bold'>パスワード確認</span>
          <InputText name='passwordConfirm' type='password' onChange={handleChange} placeholder='パスワード確認' />
          {errors.passwordConfirm && <span className='text-danger text-sm'>{errors.passwordConfirm}</span>}
        </label>
        <Button type='submit' size='lg' value='登録' />
        <p className='text-sm text-center'>
          アカウントをお持ちの場合は
          <Link href='/login' className='underline'>
            こちら
          </Link>
        </p>
      </form>
    </Container>
  )
}

export default Register
