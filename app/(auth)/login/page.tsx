'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import InputPasswordEye from '@/components/form/InputPasswordEye'
import { Button, Input } from '@nextui-org/react'

import { validateEmail, validatePassword } from '@/utils/validateUtils'
import { loginAction } from '@/redux-store/slices/authSlice'
import { useAuthentication } from '@/hooks/AuthContext'

const LoginPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [isVisible, setIsVisible] = useState({
    password: false
  })
  const { isAuthenticated } = useAuthentication()

  useEffect(() => {
    if (isAuthenticated) router.push('/')
  }, [isAuthenticated, router])
  

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }, [])

  const toggleVisible = (name: string, value: boolean) => {
    setIsVisible(prev => ({ ...prev, [name]: !value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      dispatch(loginAction(formData))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.email) newErrors.email = 'メールアドレスは必須です'
    else if (!validateEmail(formData.email)) newErrors.email = '有効なメールアドレスを入力してください'

    if (!formData.password) {
      newErrors.password = 'パスワードを入力してください'
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'パスワードは、英文字の大文字・小文字・数字を含む8桁以上でなければなりません'
    }

    setErrors(prevErrors => ({ ...prevErrors, ...newErrors }))
    return Object.keys(newErrors).length === 0
  }

  return (
    <Container className='py-20'>
      <form className='flex flex-col gap-8 max-w-[450px] m-auto' onSubmit={handleSubmit}>
        <PageHeader title='ログイン' className='text-center' />
        <Input
          type='text'
          name='email'
          label='メールアドレス'
          placeholder='メールアドレスを入力してください。'
          className='font-bold'
          labelPlacement='outside'
          isInvalid={errors.email ? true : false}
          color={errors.email ? 'danger' : 'default'}
          errorMessage={errors.email}
          onChange={handleChange}
          size='lg'
          isRequired
        />
        <Input
          type={isVisible.password ? 'text' : 'password'}
          name='password'
          label='パスワード'
          placeholder='パスワードを入力してください。'
          className='font-bold'
          labelPlacement='outside'
          isInvalid={errors.password ? true : false}
          color={errors.password ? 'danger' : 'default'}
          errorMessage={errors.password}
          onChange={handleChange}
          size='lg'
          isRequired
          endContent={<InputPasswordEye name='password' isVisible={isVisible.password} toggleVisible={toggleVisible} />}
        />
        <Button type='submit' size='lg' color='primary' className='rounded-full'>
          ログイン
        </Button>
        <p className='text-sm text-center'>
          パスワードを忘れた場合は
          <Link href='/forgot-password' className='underline'>
            こちら
          </Link>
        </p>
      </form>
    </Container>
  )
}

export default LoginPage
