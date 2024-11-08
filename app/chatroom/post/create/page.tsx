'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import SectionTitle from '@/components/common/SectionTitle'
import { Button, Checkbox, Input, Select, SelectItem } from '@nextui-org/react'
const RichTextEditor = dynamic(() => import('@/components/form/RichTextEditor'), {
  ssr: false
})

import { getImageAlt } from '@/utils/getImageAlt'
import { RootState } from '@/redux-store'
import { createPostAction } from '@/redux-store/slices/postSlice'
import { getPostTypeAction } from '@/redux-store/slices/postTypeSlice'
import { getCategoryAction } from '@/redux-store/slices/categorySlice'

const publicationOptions = [
  {
    id: '0',
    title: '選択してください'
  },
  {
    id: '1',
    title: '全体1'
  },
  {
    id: '2',
    title: '全体2'
  },
  {
    id: '3',
    title: '全体3'
  }
]

const CreatePostPage = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    hashtag: '',
    postType: '0',
    category: '0',
    publication: '0',
    notification: false,
    attachments: {
      file: '',
      preview: ''
    }
  })
  const [errors, setErrors] = useState({
    postType: '',
    category: '',
    publication: '',
    content: '',
    hashtag: '',
    attachments: ''
  })

  const { postTypes } = useSelector((state: RootState) => state.post_type)
  const { categories } = useSelector((state: RootState) => state.category)

  const postTypeOptions = useMemo(() => {
    return [{ id: 0, title: '選択してください' }, ...(Array.isArray(postTypes) ? postTypes : [])]
  }, [postTypes])

  const categoryOptions = useMemo(() => {
    return [{ id: 0, title: '選択してください' }, ...(Array.isArray(categories) ? categories : [])]
  }, [categories])

  useEffect(() => {
    dispatch(getPostTypeAction())
    if (formData.postType !== '0')
      dispatch(
        getCategoryAction({
          pageFlag: '0',
          type_id: formData.postType
        })
      )
  }, [dispatch, formData.postType])

  const handleSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }, [])

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

  const handleEditorChange = useCallback((data: string) => {
    setFormData(prevState => ({ ...prevState, content: data }))
    setErrors(prev => ({ ...prev, content: '' }))
  }, [])

  const handleCheck = (checked: boolean) => {
    setFormData(prevState => ({ ...prevState, notification: checked }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      const postPayload = new FormData()
      postPayload.append('title', formData.title)
      postPayload.append('content', formData.content)
      postPayload.append('hashtag', formData.hashtag)
      postPayload.append('type_id', formData.postType)
      postPayload.append('category_id', formData.category)
      postPayload.append('publication', formData.publication)
      postPayload.append('notification', formData.notification ? '1' : '0')
      postPayload.append('attachments', formData.attachments.file)
      dispatch(createPostAction(postPayload))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (formData.postType === '0') newErrors.postType = '選択してください'
    if (formData.category === '0') newErrors.category = '選択してください'
    if (formData.publication === '0') newErrors.publication = '選択してください'

    if (!formData.content) newErrors.content = 'この項目は必須です。'
    if (!formData.hashtag) newErrors.hashtag = 'この項目は必須です。'
    if (!formData.attachments.file) newErrors.attachments = 'この項目は必須です。'

    setErrors(prev => ({ ...prev, ...newErrors }))
    return Object.keys(newErrors).length === 0
  }

  return (
    <div className='bg-bgSemiblue px-4 pt-12 pb-[140px]'>
      <div className='max-w-[800px] m-auto'>
        <SectionTitle title='トークルームに投稿する' icon='/images/icons/edit-secondary.svg' />
        <form
          className='bg-white rounded-xl mt-6 px-6 py-8 sm:px-12 sm:py-10 flex flex-col gap-6'
          onSubmit={handleSubmit}
        >
          <Select
            label='投稿先'
            name='postType'
            placeholder='選択してください'
            labelPlacement={window.innerWidth > 768 ? 'outside-left' : 'outside'}
            classNames={{
              base: ['flex items-center justify-between'],
              label: 'font-bold',
              mainWrapper: ['w-full md:w-[480px]']
            }}
            selectedKeys={formData.postType}
            errorMessage={errors.postType}
            isInvalid={errors.postType ? true : false}
            onChange={handleSelect}
            size='lg'
            isRequired
          >
            {postTypeOptions.map((postType, key) => (
              <SelectItem key={key}>{postType.title}</SelectItem>
            ))}
          </Select>
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
            selectedKeys={formData.category}
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
          <Select
            label='公開範囲'
            name='publication'
            placeholder='選択してください'
            labelPlacement={window.innerWidth > 768 ? 'outside-left' : 'outside'}
            classNames={{
              base: ['flex items-center justify-between'],
              label: 'font-bold',
              mainWrapper: ['w-full md:w-[480px]']
            }}
            selectedKeys={formData.publication}
            errorMessage={errors.publication}
            isInvalid={errors.publication ? true : false}
            onChange={handleSelect}
            size='lg'
            isRequired
          >
            {publicationOptions.map((publication, key) => (
              <SelectItem key={key}>{publication.title}</SelectItem>
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
            labelPlacement={window.innerWidth > 768 ? 'outside-left' : 'outside'}
            onChange={handleChange}
            size='lg'
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
            <RichTextEditor onChange={handleEditorChange} />
            {errors.content && (
              <span className='absolute left-[244px] -bottom-6 text-danger text-sm'>{errors.content}</span>
            )}
          </label>
          <Input
            type='text'
            name='hashtag'
            label='ハッシュタグの設定'
            placeholder='＃テキストをご入力ください'
            classNames={{
              base: ['flex items-center justify-between'],
              label: 'font-bold',
              mainWrapper: ['w-full md:w-[480px]']
            }}
            labelPlacement={window.innerWidth > 768 ? 'outside-left' : 'outside'}
            isInvalid={errors.hashtag ? true : false}
            color={errors.hashtag ? 'danger' : 'default'}
            errorMessage={errors.hashtag}
            onChange={handleChange}
            size='lg'
            isRequired
          />
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
            isInvalid={errors.attachments ? true : false}
            color={errors.attachments ? 'danger' : 'default'}
            errorMessage={errors.attachments}
            labelPlacement={window.innerWidth > 768 ? 'outside-left' : 'outside'}
            onChange={handleChange}
            size='lg'
          />
          {formData.attachments.preview && (
            <Image
              src={formData.attachments.preview}
              alt={getImageAlt(formData.attachments.preview) || ''}
              className='md:ms-[170px] lg:ms-[244px] mt-2 w-40 h-w-40'
              width={50}
              height={50}
            />
          )}
          <Checkbox
            name='notification'
            className='m-auto'
            radius='full'
            isSelected={formData.notification}
            onValueChange={handleCheck}
          >
            ユーザーに通知する
          </Checkbox>
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
            投稿する
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreatePostPage
