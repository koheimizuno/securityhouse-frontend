'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import SectionTitle from '@/components/common/SectionTitle'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
const RichTextEditor = dynamic(() => import('@/components/form/RichTextEditor'), {
  ssr: false
})

import { editNewsAction } from '@/redux-store/slices/newsSlice'
import { getCategoryAction } from '@/redux-store/slices/categorySlice'
import { RootState } from '@/redux-store'
import { getNewsByIdAction } from '@/actions/newsAction'
import { useAuthentication } from '@/hooks/AuthContext'
import { getImageAlt } from '@/utils/getImageAlt'

const EditNewPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: {
      id: '0',
      name: ''
    },
    attachment: {
      file: '',
      preview: ''
    }
  })
  const [errors, setErrors] = useState({
    category: '',
    title: '',
    content: '',
    attachment: ''
  })
  const { session_user_id } = useAuthentication()
  const { categories } = useSelector((state: RootState) => state.category)

  const categoryOptions = useMemo(() => {
    return [{ id: 0, title: '選択してください' }, ...(Array.isArray(categories) ? categories : [])]
  }, [categories])

  useEffect(() => {
    if (typeof id === 'string')
      getNewsByIdAction({ id: Number(id), user_id: session_user_id }).then(data => {
        setFormData(prevState => ({
          ...prevState,
          title: data.title,
          content: data.content,
          category: { ...prevState.category, name: data.category_name },
          attachment: {
            ...prevState.attachment,
            preview: data.attachment
          }
        }))
      })
  }, [id, session_user_id])

  useEffect(() => {
    dispatch(
      getCategoryAction({
        pageFlag: '0',
        type_id: '5'
      })
    )
  }, [dispatch])

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, files } = e.target
    if (type === 'file') {
      const file = files ? files[0] : null
      const imageUrl = file ? URL.createObjectURL(file) : ''
      setFormData(prev => ({
        ...prev,
        [name]: {
          file: file,
          preview: imageUrl
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    setErrors(prev => ({ ...prev, [name]: '' }))
  }, [])

  const handleEditorChange = (data: string) => {
    setFormData(prevState => ({ ...prevState, content: data }))
    setErrors(prev => ({ ...prev, content: '' }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      const postPayload = new FormData()
      if (typeof id === 'string') postPayload.append('id', id)
      postPayload.append('title', formData.title)
      postPayload.append('content', formData.content)
      postPayload.append('category_id', formData.category.id)
      postPayload.append('attachments', formData.attachment.file)

      dispatch(editNewsAction(postPayload))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (formData.category.id === '0') newErrors.category = '選択してください'

    if (!formData.title) newErrors.title = 'この項目は必須です。'
    if (!formData.content) newErrors.content = 'この項目は必須です。'
    if (!formData.attachment.preview) newErrors.attachment = 'この項目は必須です。'

    setErrors(prev => ({ ...prev, ...newErrors }))
    return Object.keys(newErrors).length === 0
  }

  return (
    <div className='bg-bgSemiblue px-4 pt-12 pb-[140px]'>
      <div className='max-w-[800px] m-auto'>
        <SectionTitle title='お知らせ編集' icon='/images/icons/edit-secondary.svg' />
        <form
          className='bg-white rounded-xl mt-6 px-6 py-8 sm:px-12 sm:py-10 flex flex-col gap-6'
          onSubmit={handleSubmit}
        >
          <Select
            label='カテゴリ'
            name='category'
            placeholder='選択してください'
            labelPlacement={window.innerWidth > 768 ? 'outside-left' : 'outside'}
            classNames={{
              base: ['flex flex-col gap-2 md:flex-row items-center justify-between'],
              label: 'font-bold',
              mainWrapper: ['w-full md:w-[480px]']
            }}
            selectedKeys={formData.category.id}
            errorMessage={errors.category}
            isInvalid={errors.category ? true : false}
            onChange={handleSelect}
            size='lg'
            isRequired
          >
            {categoryOptions.map((category, key) => (
              <SelectItem key={key}>{category.title}</SelectItem>
            ))}
          </Select>
          <Input
            type='text'
            name='title'
            label='タイトル'
            placeholder='タイトルをご入力ください'
            classNames={{
              base: ['flex items-center justify-between'],
              label: 'font-bold p-0',
              mainWrapper: ['w-full md:w-[480px]']
            }}
            isInvalid={errors.title ? true : false}
            color={errors.title ? 'danger' : 'default'}
            errorMessage={errors.title}
            value={formData.title}
            labelPlacement={window.innerWidth > 768 ? 'outside-left' : 'outside'}
            onChange={handleChange}
            size='lg'
            isRequired
          />
          <label
            className={`relative flex flex-col md:flex-row md:justify-between md:items-start gap-2 ${
              errors.content && 'mb-4'
            }`}
          >
            <span
              className={`text-base font-bold after:content-["*"] after:text-danger ${errors.content && 'text-danger'}`}
            >
              内容
            </span>
            <RichTextEditor initialData={formData.content || 'ご入力ください。'} onChange={handleEditorChange} />
            {errors.content && (
              <span className='absolute left-[244px] -bottom-6 text-danger text-sm'>{errors.content}</span>
            )}
          </label>
          <Input
            type='file'
            name='attachments'
            label='プロフィール画像'
            placeholder='アップ'
            classNames={{
              base: ['flex items-center justify-between'],
              label: 'font-bold',
              mainWrapper: ['w-full md:w-[480px]']
            }}
            isInvalid={errors.attachment ? true : false}
            color={errors.attachment ? 'danger' : 'default'}
            errorMessage={errors.attachment}
            labelPlacement={window.innerWidth > 768 ? 'outside-left' : 'outside'}
            onChange={handleChange}
            size='lg'
            isRequired
          />
          {formData.attachment.preview && (
            <Image
              src={formData.attachment.preview}
              alt={getImageAlt(formData.attachment.preview) || ''}
              className='md:ms-[170px] lg:ms-[244px] mt-2 w-40 h-w-40'
              width={50}
              height={50}
            />
          )}
          <Button
            type='submit'
            color='primary'
            size='lg'
            className='w-[280px] m-auto rounded-full'
            startContent={
              <Image
                src='/images/icons/edit-white.svg'
                alt='edit-white.svg'
                className='w-5 h-5'
                width={16}
                height={16}
              />
            }
            endContent={
              <Image
                src='/images/icons/arrow-circle-right-outline.svg'
                alt='arrow-circle-right-outline.svg'
                className='w-6 h-6 absolute right-16 top-1/2 -translate-y-1/2'
                width={20}
                height={20}
              />
            }
          >
            登録する
          </Button>
        </form>
      </div>
    </div>
  )
}

export default EditNewPage
