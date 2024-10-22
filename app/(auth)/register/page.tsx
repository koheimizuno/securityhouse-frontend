'use client'

import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import InputPasswordEye from '@/components/form/InputPasswordEye'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'

import { validateEmail } from '@/utils/validateUtils'
import { registerAction } from '@/redux-store/slices/authSlice'

const roleOptions = [
  { id: '0', title: '選択してください' },
  { id: '1', title: '役割1' },
  { id: '2', title: '役割2' },
  { id: '3', title: '役割3' }
]

const groupsOptions = [
  { id: '0', title: '選択してください' },
  { id: '1', title: 'グループ1' },
  { id: '2', title: 'グループ2' },
  { id: '3', title: 'グループ3' }
]

const Register = () => {
  const dispatch = useDispatch()
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
  const [isVisible, setIsVisible] = useState({
    password: false,
    passwordConfirm: false
  })

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors({ ...errors, [name]: '' })
  }, [])

  const toggleVisible = (name: string, value: boolean) => {
    setIsVisible(prev => ({ ...prev, [name]: !value }))
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.uid) newErrors.uid = 'IDは必須です'
    if (!formData.email) newErrors.email = 'メールアドレスは必須です'
    else if (!validateEmail(formData.email)) newErrors.email = '有効なメールアドレスを入力してください'
    if (formData.role_id === '0') newErrors.role = '選択してください'
    if (formData.group_id === '0') newErrors.groups = '選択してください'
    if (!formData.password) newErrors.password = 'パスワードは必須です'
    else if (formData.password.length < 8) newErrors.password = 'パスワードは8文字以上である必要があります'
    if (formData.password !== formData.passwordConfirm) {
      newErrors.password = ''
      newErrors.passwordConfirm = 'パスワードが一致しません'
    }

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
        <Input
          type='text'
          name='uid'
          label='ID'
          placeholder='IDを入力してください。'
          className='font-bold'
          labelPlacement='outside'
          isInvalid={errors.uid ? true : false}
          color={errors.uid ? 'danger' : 'default'}
          errorMessage={errors.uid}
          onChange={handleInput}
          size='lg'
          isRequired
        />
        <Input
          type='email'
          name='email'
          label='メールアドレス'
          placeholder='メールアドレスを入力してください。'
          className='font-bold'
          labelPlacement='outside'
          isInvalid={errors.email ? true : false}
          color={errors.email ? 'danger' : 'default'}
          errorMessage={errors.email}
          onChange={handleInput}
          size='lg'
          isRequired
        />
        <Select
          label='役割'
          name='role_id'
          placeholder='選択してください'
          labelPlacement='outside'
          className='font-bold'
          selectedKeys={formData.role_id}
          errorMessage={errors.role}
          isInvalid={errors.role ? true : false}
          onChange={handleSelect}
          size='lg'
          isRequired
        >
          {roleOptions.map((role, key) => (
            <SelectItem key={key}>{role.title}</SelectItem>
          ))}
        </Select>
        <Select
          label='グループ'
          name='group_id'
          placeholder='選択してください'
          labelPlacement='outside'
          className='font-bold'
          selectedKeys={formData.group_id}
          errorMessage={errors.groups}
          isInvalid={errors.groups ? true : false}
          onChange={handleSelect}
          size='lg'
          isRequired
        >
          {groupsOptions.map((group, key) => (
            <SelectItem key={key}>{group.title}</SelectItem>
          ))}
        </Select>
        <Input
          type={isVisible ? 'text' : 'password'}
          name='password'
          label='パスワード'
          placeholder='パスワードを入力してください。'
          className='font-bold'
          labelPlacement='outside'
          isInvalid={errors.password ? true : false}
          color={errors.password ? 'danger' : 'default'}
          errorMessage={errors.password}
          onChange={handleInput}
          size='lg'
          isRequired
          endContent={<InputPasswordEye name='password' isVisible={isVisible.password} toggleVisible={toggleVisible} />}
        />
        <Input
          type={isVisible ? 'text' : 'password'}
          name='passwordConfirm'
          label='パスワード確認'
          placeholder='パスワードを入力してください。'
          className='font-bold'
          labelPlacement='outside'
          isInvalid={errors.passwordConfirm ? true : false}
          color={errors.passwordConfirm ? 'danger' : 'default'}
          errorMessage={errors.passwordConfirm}
          onChange={handleInput}
          size='lg'
          isRequired
          endContent={
            <InputPasswordEye
              name='passwordConfirm'
              isVisible={isVisible.passwordConfirm}
              toggleVisible={toggleVisible}
            />
          }
        />
        <Button type='submit' size='lg' color='primary' className='rounded-full'>
          登録
        </Button>
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
