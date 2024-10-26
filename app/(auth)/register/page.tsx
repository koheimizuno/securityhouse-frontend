/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import InputPasswordEye from '@/components/form/InputPasswordEye'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'

import { GroupType } from '@/types/groupType'
import { validateEmail, validatePassword } from '@/utils/validateUtils'
import { registerAction } from '@/redux-store/slices/authSlice'
import { getGroupAction } from '@/redux-store/slices/groupSlice'
import { RootState } from '@/redux-store'

const roleOptions = [
  { id: '1', title: '役割1' },
  { id: '2', title: '役割2' },
  { id: '3', title: '役割3' }
]

const Register = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    uid: '',
    email: '',
    role_id: '',
    group_id: '',
    password: '',
    passwordConfirm: ''
  })
  const [errors, setErrors] = useState({
    uid: '',
    email: '',
    role_id: '',
    group_id: '',
    password: '',
    passwordConfirm: ''
  })
  const [isVisible, setIsVisible] = useState({
    password: false,
    passwordConfirm: false
  })
  const { groups } = useSelector((state: RootState) => state.group)

  useEffect(() => {
    dispatch(getGroupAction())
  }, [dispatch])

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }, [])

  const toggleVisible = useCallback((name: string, value: boolean) => {
    setIsVisible(prev => ({ ...prev, [name]: !value }))
  }, [])

  const handleSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }, [])

  const validateForm = () => {
    const { uid, email, role_id, group_id, password, passwordConfirm } = formData
    const newErrors: { [key: string]: string } = {}

    if (!uid) newErrors.uid = 'IDは必須です'
    if (!email) newErrors.email = 'メールアドレスは必須です'
    else if (!validateEmail(email)) newErrors.email = '有効なメールアドレスを入力してください'
    if (role_id === '0') newErrors.role_id = '選択してください'
    if (group_id === '0') newErrors.group_id = '選択してください'
    if (!password) newErrors.password = 'パスワードは必須です'
    else if (!validatePassword(password)) {
      newErrors.password = 'パスワードは、英文字の大文字・小文字・数字を含む8桁以上でなければなりません'
    } else if (password !== passwordConfirm) {
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
          type='text'
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
          errorMessage={errors.role_id}
          isInvalid={errors.role_id ? true : false}
          onChange={handleSelect}
          size='lg'
          isRequired
        >
          {roleOptions.map(role => (
            <SelectItem key={role.id}>{role.title}</SelectItem>
          ))}
        </Select>
        <Select
          label='グループ'
          name='group_id'
          placeholder='選択してください'
          labelPlacement='outside'
          className='font-bold'
          selectedKeys={formData.group_id}
          errorMessage={errors.group_id}
          isInvalid={errors.group_id ? true : false}
          onChange={handleSelect}
          size='lg'
          isRequired
        >
          {groups.map((group: GroupType) => (
            <SelectItem key={group.id}>{group.name}</SelectItem>
          ))}
        </Select>
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
          onChange={handleInput}
          size='lg'
          isRequired
          endContent={<InputPasswordEye name='password' isVisible={isVisible.password} toggleVisible={toggleVisible} />}
        />
        <Input
          type={isVisible.passwordConfirm ? 'text' : 'password'}
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
