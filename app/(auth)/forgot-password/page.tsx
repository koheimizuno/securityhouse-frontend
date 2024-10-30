'use client'

import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import InputPasswordEye from '@/components/form/InputPasswordEye'
import { Button, Input } from '@nextui-org/react'

import { validateEmail, validatePassword } from '@/utils/validateUtils'
import { changePasswordAction, forgotPasswordAction } from '@/redux-store/slices/authSlice'

const ForgotPasswordPage = () => {
  const dispatch = useDispatch()
  const [step, setStep] = useState('forgot')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  })
  const [isVisible, setIsVisible] = useState({
    password: false,
    passwordConfirm: false
  })

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }, [])

  const toggleVisible = (name: string, value: boolean) => {
    setIsVisible(prev => ({ ...prev, [name]: !value }))
  }

  const validateForm = () => {
    const { email, password, passwordConfirm } = formData
    const newErrors: { [key: string]: string } = {}

    switch (step) {
      case 'forgot':
        if (!email) newErrors.email = 'メールアドレスは必須です'
        else if (!validateEmail(email)) newErrors.email = '有効なメールアドレスを入力してください'
        break
      case 'change':
        if (!password) newErrors.password = 'パスワードを入力してください'
        else if (!validatePassword(password))
          newErrors.password = 'パスワードは、英文字の大文字・小文字・数字を含む8桁以上でなければなりません'
        else if (password !== passwordConfirm) {
          newErrors.password = ''
          newErrors.passwordConfirm = 'パスワードとパスワード確認が一致しません'
        }
        break
      default:
        break
    }

    setErrors(prevErrors => ({ ...prevErrors, ...newErrors }))
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = formData
    e.preventDefault()
    if (validateForm()) {
      switch (step) {
        case 'forgot':
          dispatch(
            forgotPasswordAction({
              email: email
            })
          ).then(() => {
            setStep('change')
          })
          break
        case 'change':
          dispatch(
            changePasswordAction({
              email: email,
              password: password
            })
          )
          break
        default:
          break
      }
    }
  }

  return (
    <Container className='py-20'>
      <div className='max-w-[450px] m-auto flex flex-col gap-8'>
        <PageHeader title='パスワードを忘れた方へ' className='text-center' />
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          {step === 'forgot' && (
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
          )}
          {step === 'change' && (
            <>
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
                endContent={
                  <InputPasswordEye name='password' isVisible={isVisible.password} toggleVisible={toggleVisible} />
                }
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
                onChange={handleChange}
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
            </>
          )}
          <Button type='submit' size='lg' color='primary' className='rounded-full'>
            {step === 'forgot' ? '送信する' : '設定する'}
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default ForgotPasswordPage
