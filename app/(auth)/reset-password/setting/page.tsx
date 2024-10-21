'use client'

import React, { useCallback, useState } from 'react'
import Container from '@/components/layout/Container'
import { Button, Input } from '@nextui-org/react'
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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Form submitted:', formData)
    }
  }

  const validateForm = () => {
    const { password, passwordConfirm } = formData
    const newErrors = { ...errors }

    if (!password) newErrors.password = 'パスワードを入力してください'

    if (!passwordConfirm) newErrors.passwordConfirm = 'パスワード確認を入力してください'

    if (password !== passwordConfirm) {
      newErrors.password = ''
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
          <Input
            type='password'
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
          />
          <Input
            type='password'
            name='passwordConfirm'
            label='パスワード確認'
            placeholder='パスワードを入力してください。'
            className='font-bold'
            labelPlacement='outside'
            isInvalid={errors.passwordConfirm ? true : false}
            color={errors.passwordConfirm ? 'danger' : 'default'}
            errorMessage={errors.passwordConfirm}
            onChange={handleChange}
            size='lg'
            isRequired
          />
          <Button type='submit' size='lg' color='primary' className='rounded-full'>
            設定する
          </Button>
        </form>
      </div>
    </Container>
  )
}
