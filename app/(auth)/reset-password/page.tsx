'use client'

import React, { useCallback, useState } from 'react'

import Container from '@/components/layout/Container'
import InputText from '@/components/form/InputText'
import Button from '@/components/common/Button'
import PageHeader from '@/components/common/PageHeader'

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
          <label className='flex flex-col gap-2'>
            <span className='text-sm font-bold'>ID</span>
            <InputText name='id' onChange={handleChange} placeholder='ID' />
            {errors.id && <span className='text-danger text-sm'>{errors.id}</span>}
          </label>
          <Button type='submit' size='lg' value='送信する' />
        </form>
      </div>
    </Container>
  )
}

export default ResetPassword
