'use client'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'

import SectionTitle from '@/components/common/SectionTitle'
import InputText from '@/components/form/InputText'
import TextAreaText from '@/components/form/TextAreaText'
import Button from '@/components/common/Button'

import { editUserAction } from '@/redux-store/slices/authSlice'

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

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (!formData.name.trim()) {
      newErrors.name = '表示名は必須です'
      isValid = false
    }

    if (formData.intro.length > 500) {
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
        <label className='flex flex-col gap-2'>
          <span className='text-sm font-bold'>プロフィール画像</span>
          <InputText name='thumbnail' type='file' className='h-fit' placeholder='アップ' onChange={handleChange} />
          {errors.thumbnail && <span className='text-danger text-sm'>{errors.thumbnail}</span>}
          {formData.thumbnail.preview && (
            <Image
              src={formData.thumbnail.preview}
              alt='Selected'
              className='mt-2 w-32 h-w-32 rounded-full'
              width={50}
              height={50}
            />
          )}
        </label>
        <label className='flex flex-col gap-2'>
          <span className='text-sm font-bold'>表示名</span>
          <InputText name='name' placeholder='山田太郎' onChange={handleChange} />
          {errors.name && <span className='text-danger text-sm'>{errors.name}</span>}
        </label>
        <label className='flex flex-col gap-2'>
          <span className='text-sm font-bold'>自己紹介</span>
          <TextAreaText name='intro' placeholder='自己紹介を入力' onChange={handleTextAreaChange} />
          {errors.intro && <span className='text-danger text-sm'>{errors.intro}</span>}
        </label>
        <Button type='submit' size='lg' value='保存' />
      </form>
    </>
  )
}

export default ProfileEditContent
