/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'

import SectionTitle from '@/components/common/SectionTitle'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
const RichTextEditor = dynamic(() => import('@/components/form/RichTextEditor'), {
  ssr: false
})

import { getPostByIdAction } from '@/actions/postAction'
import { editPostAction } from '@/redux-store/slices/postSlice'
import { getPostTypeAction } from '@/redux-store/slices/postTypeSlice'
import { getCategoryAction } from '@/redux-store/slices/categorySlice'

import { getImageAlt } from '@/utils/getImageAlt'
import { RootState } from '@/redux-store'

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

const EditPostPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    hashtag: '',
    postType: '0',
    category: '0',
    publication: '0',
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
    hashtag: ''
  })

  const { postTypes } = useSelector((state: RootState) => state.post_type)
  const { categories } = useSelector((state: RootState) => state.category)

  const postTypeOptions = useMemo(() => {
    return [{ id: '0', title: '選択してください', group_id: null }, ...postTypes]
  }, [postTypes])

  const categoryOptions = useMemo(() => {
    return [{ id: '0', title: '選択してください', group_id: null }, ...categories]
  }, [categories])

  useEffect(() => {
    dispatch(getPostTypeAction())
    dispatch(
      getCategoryAction({
        pageFlag: '0',
        type_id: formData.postType
      })
    )
  }, [dispatch, formData.postType])

  useEffect(() => {
    const fetchPostByIdData = async () => {
      if (typeof id === 'string') {
        try {
          const originPost = await getPostByIdAction(id)
          setFormData(prevState => ({
            ...prevState,
            // postType: originPost.type_id,
            category: originPost.category_id,
            publication: originPost.publication,
            title: originPost.title,
            content: originPost.content,
            hashtag: originPost.hashtag,
            attachments: { ...prevState.attachments, preview: originPost.attachments }
          }))
        } catch (error) {
          console.error('Error fetching post:', error)
        }
      }
    }
    fetchPostByIdData()
  }, [id])

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }

  const handleEditorChange = (data: string) => {
    setFormData(prevState => ({ ...prevState, content: data }))
    setErrors(prev => ({ ...prev, content: '' }))
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
      postPayload.append('attachments', formData.attachments.file)

      dispatch(editPostAction(postPayload))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (formData.postType === '0') newErrors.postType = '選択してください'
    if (formData.category === '0') newErrors.category = '選択してください'
    if (formData.publication === '0') newErrors.publication = '選択してください'

    if (!formData.content) newErrors.content = 'この項目は必須です。'
    if (!formData.hashtag) newErrors.hashtag = 'この項目は必須です。'

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
            placeholder={postTypeOptions[Number(formData.postType)]?.title || '選択してください'}
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
            placeholder={postTypeOptions[Number(formData.category)]?.title || '選択してください'}
            labelPlacement={window.innerWidth > 768 ? 'outside-left' : 'outside'}
            classNames={{
              base: ['flex items-center justify-between'],
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
            placeholder={postTypeOptions[Number(formData?.publication)]?.title || '選択してください'}
            labelPlacement={window.innerWidth > 768 ? 'outside-left' : 'outside'}
            classNames={{
              base: ['flex items-center justify-between'],
              label: 'font-bold',
              mainWrapper: ['w-full md:w-[480px]']
            }}
            selectedKeys={formData?.publication}
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
            value={formData.title}
            onChange={handleChange}
            size='lg'
          />
          <label
            className={`relative flex flex-col md:flex-row md:justify-between md:items-start gap-2 ${
              errors.content && 'mb-4'
            }`}
          >
            <span className='text-base font-bold after:content-["*"] after:text-danger'>内容</span>
            <RichTextEditor initialData={formData.content || 'ご入力ください。'} onChange={handleEditorChange} />
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
            value={formData.hashtag}
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
            labelPlacement={window.innerWidth > 768 ? 'outside-left' : 'outside'}
            onChange={handleChange}
            size='lg'
          />
          {(formData.attachments.preview || formData?.attachments?.file) && (
            <Image
              src={formData.attachments.preview || formData?.attachments?.file || ''}
              alt={getImageAlt(formData.attachments.preview || formData?.attachments?.file || '') || ''}
              className={`md:ms-[170px] lg:ms-[244px] mt-2 w-40 h-40`}
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
            変更する
          </Button>
        </form>
      </div>
    </div>
  )
}

export default EditPostPage
