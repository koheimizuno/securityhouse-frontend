'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import InputText from '@/components/form/InputText'
import Button from '@/components/common/Button'

import { loginAction } from '@/actions/authAction'

import { validateEmail } from '@/utils/validateUtils'

const Login = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = { email: '', password: '' }

    if (!formData.email) newErrors.email = 'メールアドレスは必須です'
    else if (!validateEmail(formData.email)) newErrors.email = '有効なメールアドレスを入力してください'

    if (!formData.password) {
      newErrors.password = 'パスワードを入力してください'
    } else if (formData.password.length < 8) {
      newErrors.password = 'パスワードは8文字以上で入力してください'
    }

    setErrors(newErrors)

    if (!newErrors.email && !newErrors.password) {
      const res: any = await loginAction(formData)
      if (res.status === 200) {
        toast.success('ログインに成功しました。')
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else {
        toast.error('サーバの問題でデータ取得に失敗しました。')
      }
    }
  }

  return (
    <Container className='py-20'>
      <form className='flex flex-col gap-8 max-w-[450px] m-auto' onSubmit={handleSubmit}>
        <PageHeader title='ログイン' className='text-center' />
        <label className='flex flex-col gap-2'>
          <span className='text-sm font-bold'>メールアドレス</span>
          <InputText name='email' onChange={handleChange} placeholder='メールアドレス' />
          {errors.email && <span className='text-danger text-sm'>{errors.email}</span>}
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
