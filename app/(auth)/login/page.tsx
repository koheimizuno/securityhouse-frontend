'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import InputText from '@/components/form/InputText'
import Button from '@/components/common/Button'

const Login = () => {
  const [formData, setFormData] = useState({ id: '', password: '' })
  const [errors, setErrors] = useState({ id: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = { id: '', password: '' }

    if (!formData.id.trim()) {
      newErrors.id = 'IDを入力してください'
    }

    if (!formData.password) {
      newErrors.password = 'パスワードを入力してください'
    } else if (formData.password.length < 8) {
      newErrors.password = 'パスワードは8文字以上で入力してください'
    }

    setErrors(newErrors)

    if (!newErrors.id && !newErrors.password) {
      console.log('Form is valid, submitting...', formData)
    }
  }

  return (
    <Container className='py-20'>
      <form className='flex flex-col gap-8 max-w-[450px] m-auto' onSubmit={handleSubmit}>
        <PageHeader title='ログイン' className='text-center' />
        <label className='flex flex-col gap-2'>
          <span className='text-sm font-bold'>ID</span>
          <InputText name='id' onChange={handleChange} placeholder='ID' />
          {errors.id && <span className='text-danger text-sm'>{errors.id}</span>}
        </label>
        <label className='flex flex-col gap-2'>
          <span className='text-sm font-bold'>パスワード</span>
          <InputText name='password' type='password' onChange={handleChange} placeholder='パスワード' />
          {errors.password && <span className='text-danger text-sm'>{errors.password}</span>}
        </label>

        <Button type='submit' size='lg' value='ログイン' />
        <p className='text-sm text-center'>
          パスワードを忘れた場合は
          <Link href='/reset-password' className='underline'>
            こちら
          </Link>
        </p>
      </form>
    </Container>
  )
}

export default Login
