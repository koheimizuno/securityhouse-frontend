'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'

import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import SearchBar from '@/components/common/SearchBar'
import SectionTitle from '@/components/common/SectionTitle'
import SelectText from '@/components/form/SelectText'
import InputText from '@/components/form/InputText'
import Button from '@/components/common/Button'
const RichTextEditor = dynamic(() => import('@/components/form/RichTextEditor'), {
  ssr: false
})

import { createPostAction } from '@/redux-store/slices/postSlice'
import { getPostByIdAction } from '@/actions/postAction'
import { getPostTypeAction } from '@/redux-store/slices/postTypeSlice'
import { getCategoryAction } from '@/redux-store/slices/categorySlice'
import { getTitleById } from '@/utils/getTitleById'
import { PostType } from '@/types/postType'
import getImageAlt from '@/utils/getImageAlt'

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

const EditPost = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [selectedValue, setSelectedValue] = useState({
    postType: '0',
    category: '0',
    publication: '0'
  })
  const [inputValues, setInputValues] = useState({
    title: '',
    content: '',
    hashtag: '',
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
  const [postData, setPostData] = useState<PostType | null>(null)

  const { postTypes } = useSelector((state: any) => state.post_type)
  const { categories } = useSelector((state: any) => state.category)

  const postTypeOptions = useMemo(() => {
    return [{ id: '0', title: '選択してください' }, ...postTypes]
  }, [postTypes])

  const categoryOptions = useMemo(() => {
    return [{ id: '0', title: '選択してください' }, ...categories]
  }, [categories])

  useEffect(() => {
    dispatch(getPostTypeAction())
    dispatch(getCategoryAction())
  }, [])

  useEffect(() => {
    const fetchPostByIdData = async () => {
      if (typeof id === 'string') {
        try {
          const res = await getPostByIdAction(id)
          setPostData(res)
        } catch (error) {
          console.error('Error fetching post:', error)
        }
      }
    }
    fetchPostByIdData()
  }, [id])

  const handleSelect = (name: string, value: string) => {
    setSelectedValue(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, files } = e.target
    if (type === 'file') {
      const file = files ? files[0] : null
      const imageUrl = file ? URL.createObjectURL(file) : ''
      setInputValues(prev => ({
        ...prev,
        [name]: {
          file: file,
          preview: imageUrl
        }
      }))
    } else {
      setInputValues(prev => ({ ...prev, [name]: value }))
    }
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleEditorChange = (data: string) => {
    setInputValues(prevState => ({ ...prevState, content: data }))
    setErrors(prev => ({ ...prev, content: '' }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      let postPayload = new FormData()
      postPayload.append('title', inputValues.title)
      postPayload.append('content', inputValues.content)
      postPayload.append('hashtag', inputValues.hashtag)
      postPayload.append('type_id', selectedValue.postType)
      postPayload.append('category_id', selectedValue.category)
      postPayload.append('publication', selectedValue.publication)
      postPayload.append('attachments', inputValues.attachments.file)

      dispatch(createPostAction(postPayload))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (selectedValue.postType === '0') newErrors.postType = '選択してください'
    if (selectedValue.category === '0') newErrors.category = '選択してください'
    if (selectedValue.publication === '0') newErrors.publication = '選択してください'

    if (!inputValues.content) newErrors.content = 'この項目は必須です。'
    if (!inputValues.hashtag) newErrors.hashtag = 'この項目は必須です。'

    setErrors(prev => ({ ...prev, ...newErrors }))
    return Object.keys(newErrors).length === 0
  }

  return (
    <>
      <Breadcrumb />
      <SearchBar />
      <div className='bg-bgSemiblue px-4 pt-12 pb-[140px]'>
        <div className='max-w-[800px] m-auto'>
          <SectionTitle title='トークルームに投稿する' icon='/images/edit-secondary.svg' />
          <form
            className='bg-white rounded-xl mt-6 px-6 py-8 sm:px-12 sm:py-10 flex flex-col gap-6'
            onSubmit={handleSubmit}
          >
            <label
              className={`relative flex flex-col md:flex-row md:justify-between md:items-center gap-2 ${
                errors.postType && 'mb-4'
              }`}
            >
              <span className='text-base font-bold'>投稿先</span>
              <SelectText
                options={postTypeOptions}
                value={(postData && postData?.type_id) || '0'}
                onChange={handleSelect}
                placeholder={(postData && getTitleById(postTypeOptions, postData?.type_id)) || '選択してください'}
                name='postType'
                className='w-full md:w-[480px]'
              />
              {errors.postType && (
                <span className='absolute left-[244px] -bottom-6 text-danger text-sm'>{errors.postType}</span>
              )}
            </label>
            <label
              className={`relative flex flex-col md:flex-row md:justify-between md:items-center gap-2 ${
                errors.category && 'mb-4'
              }`}
            >
              <span className='text-base font-bold'>カテゴリ</span>
              <SelectText
                options={categoryOptions}
                value={(postData && postData?.category_id) || '0'}
                onChange={handleSelect}
                placeholder={(postData && getTitleById(categoryOptions, postData?.category_id)) || '選択してください'}
                name='category'
                className='w-full md:w-[480px]'
              />
              {errors.category && (
                <span className='absolute left-[244px] -bottom-6 text-danger text-sm'>{errors.category}</span>
              )}
            </label>
            <label
              className={`relative flex flex-col md:flex-row md:justify-between md:items-center gap-2 ${
                errors.publication && 'mb-4'
              }`}
            >
              <span className='text-base font-bold'>公開範囲</span>
              <SelectText
                options={publicationOptions}
                value={selectedValue.publication}
                onChange={handleSelect}
                placeholder={publicationOptions[0].title}
                name='publication'
                className='w-full md:w-[480px]'
              />
              {errors.publication && (
                <span className='absolute left-[244px] -bottom-6 text-danger text-sm'>{errors.publication}</span>
              )}
            </label>
            <label className='relative flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
              <p className='text-base font-bold flex flex-col gap-0'>
                <span>タイトル</span>
                <span className='text-xs text-colorGray4'>※任意</span>
              </p>
              <InputText
                name='title'
                onChange={handleChange}
                placeholder={postData ? postData?.title : 'タイトルをご入力ください'}
                className='w-full md:w-[480px]'
              />
            </label>
            <label
              className={`relative flex flex-col md:flex-row md:justify-between md:items-start gap-2 ${
                errors.content && 'mb-4'
              }`}
            >
              <span className='text-base font-bold'>内容</span>
              <RichTextEditor
                initialData={postData ? postData.content : 'ご入力ください。'}
                onChange={handleEditorChange}
              />
              {errors.content && (
                <span className='absolute left-[244px] -bottom-6 text-danger text-sm'>{errors.content}</span>
              )}
            </label>
            <label
              className={`relative flex flex-col md:flex-row md:justify-between md:items-center gap-2 ${
                errors.hashtag && 'mb-4'
              }`}
            >
              <span className='text-base font-bold'>ハッシュタグの設定</span>
              <InputText
                name='hashtag'
                onChange={handleChange}
                placeholder={postData ? postData?.hashtag : '＃テキストをご入力ください'}
                className='w-full md:w-[480px]'
              />
              {errors.hashtag && (
                <span className='absolute left-[244px] -bottom-6 text-danger text-sm'>{errors.hashtag}</span>
              )}
            </label>
            <label className='relative flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
              <span className='text-sm font-bold'>プロフィール画像</span>
              <InputText
                name='attachments'
                type='file'
                className='h-fit w-full md:w-[480px]'
                placeholder='アップ'
                onChange={handleChange}
              />
            </label>
            {(inputValues.attachments.preview || postData?.attachments) && (
              <Image
                src={inputValues.attachments.preview || postData?.attachments || ''}
                alt={getImageAlt(inputValues.attachments.preview || postData?.attachments || '') || ''}
                className={`md:ms-[170px] lg:ms-[244px] mt-2 w-40 h-40`}
                width={50}
                height={50}
              />
            )}
            <Button
              type='submit'
              size='lg'
              className='h-12 md:h-14 w-[280px] m-auto'
              icon='/images/edit-white.svg'
              subIcon='/images/arrow-circle-right-outline.svg'
              value='投稿する'
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default EditPost