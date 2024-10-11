'use client'

import React, { useState } from 'react'
import Container from '@/components/layout/Container'
import Input from '@/components/form/InputText'
import Button from '@/components/common/Button'
import PageHeader from '@/components/common/PageHeader'

export default function Setting() {
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirm: ''
  })
  const [errors, setErrors] = useState({
    password: '',
    passwordConfirm: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Form submitted:', formData)
    }
  }

  const validateForm = () => {
    const { password, passwordConfirm } = formData
    const newErrors = { ...errors }

    if (!password) {
      newErrors.password = 'パスワードを入力してください'
    }

    if (!passwordConfirm) {
      newErrors.passwordConfirm = 'パスワード確認を入力してください'
    }

    if (password !== passwordConfirm) {
      newErrors.passwordConfirm = 'パスワードとパスワード確認が一致しません'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <Container className='py-20'>
      <div className='max-w-[450px] m-auto flex flex-col gap-8'>
        <PageHeader title='パスワードを忘れた方へ' className='text-center' />
        <form className='flex flex-col gap-7' onSubmit={handleSubmit}>
          <p className='text-sm'>パスワードを再設定</p>
          <label className='flex flex-col gap-2'>
            <span className='text-sm font-bold'>パスワード</span>
            <Input name='password' type='password' placeholder='パスワード' onChange={handleChange} />
            {errors.password && <span className='text-danger text-sm'>{errors.password}</span>}
          </label>
          <label className='flex flex-col gap-2'>
            <span className='text-sm font-bold'>パスワード確認</span>
            <Input name='passwordConfirm' type='password' placeholder='パスワード確認' onChange={handleChange} />
            {errors.passwordConfirm && <span className='text-danger text-sm'>{errors.passwordConfirm}</span>}
          </label>
          <Button type='submit' size='lg' value='設定する' />
        </form>
      </div>
    </Container>
  )
}
