'use client'

import React, { useState } from 'react'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import SearchBar from '@/components/common/SearchBar'
import SectionTitle from '@/components/common/SectionTitle'
import SelectText from '@/components/form/SelectText'
import InputText from '@/components/form/InputText'
import TextAreaText from '@/components/form/TextAreaText'
import Button from '@/components/common/Button'

const roomCatOptions = [
  { value: 'SH会', label: 'SH会' },
  { value: '仕事', label: '仕事' },
  { value: '交流', label: '交流' },
  { value: '社長室', label: '社長室' }
]

const category = [
  {
    value: '事務局からのご案内1',
    label: '事務局からのご案内1'
  },
  {
    value: '事務局からのご案内2',
    label: '事務局からのご案内2'
  },
  {
    value: '事務局からのご案内3',
    label: '事務局からのご案内3'
  },
  {
    value: '事務局からのご案内4',
    label: '事務局からのご案内4'
  }
]

const postRange = [
  {
    value: '全体1',
    label: '全体1'
  },
  {
    value: '全体2',
    label: '全体2'
  },
  {
    value: '全体3',
    label: '全体3'
  }
]

const CreatePost = () => {
  const [selectedValue, setSelectedValue] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleSelect = (name: string, value: string) => {
    setSelectedValue(value)
    console.log(name)
    console.log(value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
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
            <label className='flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
              <span className='text-base font-bold'>投稿先</span>
              <SelectText
                options={roomCatOptions}
                value={selectedValue}
                onChange={handleSelect}
                placeholder='SH会'
                name='post_type'
                className='w-full md:w-[480px]'
              />
            </label>
            <label className='flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
              <span className='text-base font-bold'>カテゴリ</span>
              <SelectText
                options={category}
                value={selectedValue}
                onChange={handleSelect}
                placeholder='事務局からのご案内1'
                name='category'
                className='w-full md:w-[480px]'
              />
            </label>
            <label className='flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
              <span className='text-base font-bold'>公開範囲</span>
              <SelectText
                options={postRange}
                value={selectedValue}
                onChange={handleSelect}
                placeholder='全体1'
                name='pub-range'
                className='w-full md:w-[480px]'
              />
            </label>
            <label className='flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
              <p className='text-base font-bold flex flex-col gap-0'>
                <span>タイトル</span>
                <span className='text-xs text-colorGray4'>※任意</span>
              </p>
              <InputText
                name='title'
                onChange={handleChange}
                placeholder='タイトルをご入力ください'
                className='w-full md:w-[480px]'
              />
            </label>
            <label className='flex flex-col md:flex-row md:justify-between md:items-start gap-2'>
              <span className='text-base font-bold'>内容</span>
              <TextAreaText
                name='bio'
                placeholder='自己紹介を入力'
                onChange={handleChange}
                className='w-full md:w-[480px]'
              />
            </label>
            <label className='flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
              <span className='text-base font-bold'>ハッシュタグの設定</span>
              <InputText
                name='hashtag'
                onChange={handleChange}
                placeholder='＃テキストをご入力ください'
                className='w-full md:w-[480px]'
              />
            </label>
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

export default CreatePost
