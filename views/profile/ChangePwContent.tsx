'use client'

import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'

import SectionTitle from '@/components/common/SectionTitle'

import { getUserByIdAction } from '@/actions/authAction'
import { editUserAction } from '@/redux-store/slices/authSlice'
import { Button, Input } from '@nextui-org/react'
import InputPasswordEye from '@/components/form/InputPasswordEye'

const ChangePwContent = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    current_pw: '',
    new_pw: '',
    new_pw_confirm: ''
  })
  const [errors, setErrors] = useState({
    current_pw: '',
    new_pw: '',
    new_pw_confirm: ''
  })
  const [isVisible, setIsVisible] = useState({
    currentPw: false,
    newPw: false,
    newPwConfirm: false
  })

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
    setErrors(prevState => ({ ...prevState, [name]: '' }))
  }, [])

  const toggleVisible = (name: string, value: boolean) => {
    setIsVisible(prev => ({ ...prev, [name]: !value }))
  }

  const validateForm = async () => {
    let isValid = true,
      originUserData = {
        password: ''
      }
    const newErrors = { ...errors }

    if (formData.current_pw.length < 8) {
      newErrors.current_pw = '現在のパスワードは8文字以上である必要があります'
      isValid = false
    }

    if (typeof id === 'string') {
      originUserData = await getUserByIdAction(id)
    }

    if (formData.current_pw !== originUserData.password) {
      newErrors.current_pw = '現在のパスワードが正しくありません。'
      isValid = false
    }

    if (formData.new_pw.length < 8) {
      newErrors.new_pw = '新しいパスワードは8文字以上である必要があります'
      isValid = false
    }

    if (formData.new_pw !== formData.new_pw_confirm) {
      newErrors.new_pw_confirm = '新しいパスワードと確認用パスワードが一致しません'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (await validateForm()) {
      dispatch(editUserAction({ password: formData.new_pw }))
    }
  }

  return (
    <>
      <SectionTitle title='アカウント設定' />
      <form className='mt-4 flex flex-col gap-8' onSubmit={handleSubmit}>
        <Input
          type={isVisible.currentPw ? 'text' : 'password'}
          name='current_pw'
          label='現在のパスワード'
          placeholder='現在のパスワードを入力してください。'
          className='font-bold'
          labelPlacement='outside'
          isInvalid={errors.current_pw ? true : false}
          color={errors.current_pw ? 'danger' : 'default'}
          errorMessage={errors.current_pw}
          onChange={handleChange}
          size='lg'
          isRequired
          endContent={
            <InputPasswordEye name='currentPw' isVisible={isVisible.currentPw} toggleVisible={toggleVisible} />
          }
        />
        <Input
          type={isVisible.newPw ? 'text' : 'password'}
          name='new_pw'
          label='変更後のパスワード'
          placeholder='変更後のパスワードを入力してください。'
          className='font-bold'
          labelPlacement='outside'
          isInvalid={errors.new_pw ? true : false}
          color={errors.new_pw ? 'danger' : 'default'}
          errorMessage={errors.new_pw}
          onChange={handleChange}
          size='lg'
          isRequired
          endContent={<InputPasswordEye name='newPw' isVisible={isVisible.newPw} toggleVisible={toggleVisible} />}
        />

        <Input
          type={isVisible.newPwConfirm ? 'text' : 'password'}
          name='new_pw_confirm'
          label='変更後のパスワード（確認）'
          placeholder='変更後のパスワード（確認）を入力してください。'
          className='font-bold'
          labelPlacement='outside'
          isInvalid={errors.new_pw_confirm ? true : false}
          color={errors.new_pw_confirm ? 'danger' : 'default'}
          errorMessage={errors.new_pw_confirm}
          onChange={handleChange}
          size='lg'
          isRequired
          endContent={
            <InputPasswordEye name='newPwConfirm' isVisible={isVisible.newPwConfirm} toggleVisible={toggleVisible} />
          }
        />
        <Button type='submit' size='lg' color='primary' className='rounded-full'>
          保存する
        </Button>
      </form>
    </>
  )
}

export default ChangePwContent
