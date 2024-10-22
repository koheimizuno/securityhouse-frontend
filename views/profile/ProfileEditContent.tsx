'use client'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'

import SectionTitle from '@/components/common/SectionTitle'

import { editUserAction } from '@/redux-store/slices/authSlice'
import { Button, Input, Textarea } from '@nextui-org/react'

type editDataType = {
  thumbnail: {
    file: any
    preview: string
  }
  name: string
  intro: string
}

const ProfileEditContent = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<editDataType>({
    thumbnail: {
      file: '',
      preview: ''
    },
    name: '',
    intro: ''
  })
  const [errors, setErrors] = useState({
    thumbnail: '',
    name: '',
    intro: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, files } = e.target
    if (type === 'file') {
      const file = files ? files[0] : null
      const imageUrl = file ? URL.createObjectURL(file) : ''
      setFormData({
        ...formData,
        [name]: {
          file: file,
          preview: imageUrl
        }
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
    setErrors({ ...errors, [name]: '' })
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (!formData.thumbnail.file) {
      newErrors.thumbnail = 'プロフィール画像は必須です'
      isValid = false
    }

    if (!formData.name.trim()) {
      newErrors.name = '表示名は必須です'
      isValid = false
    }

    if (!formData.intro.trim()) {
      newErrors.intro = '自己紹介は必須です'
      isValid = false
    } else if (formData.intro.length > 500) {
      newErrors.intro = '自己紹介は500文字以内で入力してください'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      const payloadForm = new FormData()

      payloadForm.append('name', formData.name)
      payloadForm.append('intro', formData.intro)
      payloadForm.append('thumbnail', formData.thumbnail.file)

      dispatch(editUserAction(payloadForm))
    }
  }

  return (
    <>
      <SectionTitle title='プロフィール編集' />
      <form className='mt-4 flex flex-col gap-8' onSubmit={handleSubmit}>
        <Input
          type='file'
          name='thumbnail'
          label='プロフィール画像'
          placeholder='アップ'
          className='font-bold'
          labelPlacement='outside'
          isInvalid={errors.thumbnail ? true : false}
          color={errors.thumbnail ? 'danger' : 'default'}
          errorMessage={errors.thumbnail}
          onChange={handleChange}
          size='lg'
          isRequired
        />
        {formData.thumbnail.preview && (
          <Image
            src={formData.thumbnail.preview}
            alt='Selected'
            className='mt-2 w-32 h-w-32 rounded-full'
            width={50}
            height={50}
          />
        )}
        <Input
          type='text'
          name='name'
          label='表示名'
          placeholder='山田太郎'
          className='font-bold'
          labelPlacement='outside'
          isInvalid={errors.name ? true : false}
          color={errors.name ? 'danger' : 'default'}
          errorMessage={errors.name}
          onChange={handleChange}
          size='lg'
          isRequired
        />
        <Textarea
          name='intro'
          label='自己紹介'
          placeholder='自己紹介を入力してください。'
          className='font-bold'
          labelPlacement='outside'
          isInvalid={errors.intro ? true : false}
          color={errors.intro ? 'danger' : 'default'}
          errorMessage={errors.intro}
          onChange={handleChange}
          size='lg'
          isRequired
        />
        <Button type='submit' size='lg' color='primary' className='rounded-full'>
          保存
        </Button>
      </form>
    </>
  )
}

export default ProfileEditContent
