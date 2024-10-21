'use client'

import React, { useCallback, useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import { Button, Input } from '@nextui-org/react'

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    id: ''
  })
  const [errors, setErrors] = useState({
    id: ''
  })

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.id) {
      setErrors({ ...errors, id: 'IDを入力してください' })
    }

    if (!errors.id) {
      console.log('Form is valid, submitting...', formData)
    }
  }

  return (
    <Container className='py-20'>
      <div className='max-w-[450px] m-auto flex flex-col gap-8'>
        <PageHeader title='パスワードを忘れた方へ' className='text-center' />
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <p className='text-sm'>パスワードを再設定</p>
          <Input
            type='text'
            name='id'
            label='ID'
            placeholder='IDを入力してください。'
            className='font-bold'
            labelPlacement='outside'
            isInvalid={errors.id ? true : false}
            color={errors.id ? 'danger' : 'default'}
            errorMessage={errors.id}
            onChange={handleChange}
            size='lg'
            isRequired
          />
          <Button type='submit' size='lg' color='primary' className='rounded-full'>
            送信する
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default ResetPassword
