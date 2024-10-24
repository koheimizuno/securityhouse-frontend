'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import Breadcrumb from '@/components/breadcrumb'
import SearchBar from '@/components/common/SearchBar'
import CommentItem from '@/views/comment/CommentItem'
import { Button, Divider, Input, Textarea } from '@nextui-org/react'

import { useClickAway } from '@uidotdev/usehooks'
import { deletePostAction } from '@/redux-store/slices/postSlice'
import { getPostByIdAction } from '@/actions/postAction'

const SHRoomPostDetail = () => {
  const { id } = useParams()
  const pathname = usePathname()
  const dispatch = useDispatch()
  const [moreActive, setMoreActive] = useState<boolean>(false)

  useEffect(() => {
    if (typeof id === 'string') {
      getPostByIdAction(id).then(data => {
        console.log(data)
      })
    }
  }, [])

  const ref = useClickAway<HTMLDivElement>(() => {
    setMoreActive(false)
  })

  const handleDeletePost = async () => {
    await dispatch(deletePostAction(id))
    setMoreActive(false)
  }

  const handleLike = () => {}
  const handleBookmark = () => {}

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <>
      <Breadcrumb />
      <SearchBar />
      <Container>
        <section className='py-12'>
          <PageHeader title='SH会トークルーム' />
          <div className='mt-5 flex flex-col gap-8 bg-bgSemiblue px-16 py-10 rounded-2xl'>
            <div className='flex flex-row justify-between items-center'>
              <div className='flex flex-row gap-6'>
                <div className='flex items-center gap-2 mt-4 mb-3'>
                  <Image src='/images/icons/user-icon00.svg' alt='user-icon00 w-11 h-11' width={44} height={44} />
                  <div>
                    <p className='text-sm'>山田太郎／所属名</p>
                    <p>0000年00月00日00:00</p>
                  </div>
                </div>
                <div className='flex items-center flex-wrap gap-2'>
                  {['SH会', '事務局からのご案内'].map((tag, id) => (
                    <Button
                      key={id}
                      size='sm'
                      color='primary'
                      disabled
                      className='text-xs px-2 py-0 h-6 rounded-full w-fit'
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
              <div ref={ref} className='relative'>
                <button onClick={() => pathname !== '/' && setMoreActive(!moreActive)}>
                  <Image src='/images/icons/more-icon.svg' alt='more-icon' width={32} height={32} />
                </button>
                {moreActive && (
                  <ul className='bg-white absolute z-10 top-4 left-4 w-[150px] flex flex-col shadow-md rounded-md'>
                    <li className='px-6 py-2 rounded-md hover:bg-colorGray1'>
                      <Link href={`/chatroom/post/edit/${id}`}>編集する</Link>
                    </li>
                    <li className='px-6 py-2 rounded-md hover:bg-colorGray1 cursor-pointer' onClick={handleDeletePost}>
                      削除する
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <h3 className='text-xl font-bold truncate text-txtColor'>タイトルタイトルタイトル</h3>
            <p>
              投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります
            </p>
            <Image
              src='/images/post-thumnail-sample.png'
              alt='post-thumnail-sample'
              className='w-full h-auto'
              width={40}
              height={40}
            />
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <Image src='/images/icons/thumbs-up-black.svg' alt='thumbs-up' width={20} height={20} />
                <p className='text-sm font-bold'>
                  <button className='underline' onClick={handleLike}>
                    いいね！{' '}
                  </button>
                  <span className='ms-2'>5件</span>
                </p>
              </div>
              <button onClick={handleBookmark}>
                <Image
                  src='/images/icons/bookmark-icon-black.svg'
                  alt='/images/icons/bookmark-off.svg'
                  className='w-8 h-8'
                  width={32}
                  height={32}
                />
              </button>
            </div>
            <Divider className='h-[2px]' />
            <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
              <SectionTitle title='投稿にコメントする' icon='/images/icons/comment-icon-primary.svg' />
              <Textarea
                name='comment'
                label='コメント'
                placeholder='コメント内容を入力してください。'
                className='font-bold'
                labelPlacement='outside'
                // isInvalid={errors.intro ? true : false}
                // color={errors.intro ? 'danger' : 'default'}
                // errorMessage={errors.intro}
                // onChange={handleChange}
                size='lg'
                isRequired
              />
              <Input
                type='file'
                name='thumbnail'
                label='プロフィール画像'
                className='font-bold'
                placeholder='アップ'
                labelPlacement='outside'
                // isInvalid={errors.thumbnail ? true : false}
                // color={errors.thumbnail ? 'danger' : 'default'}
                // errorMessage={errors.thumbnail}
                // onChange={handleChange}
                size='lg'
                isRequired
              />
              {/* {formData.thumbnail.preview && (
                <Image
                  src={formData.thumbnail.preview}
                  alt='Selected'
                  className='mt-2 w-32 h-w-32 rounded-full'
                  width={50}
                  height={50}
                />
              )} */}
              <Button type='submit' color='primary' size='lg'>
                コメントする
              </Button>
            </form>
          </div>
        </section>
        <section className='py-12'>
          <PageHeader title='コメント' />
          <ul className='flex flex-col gap-10'>
            <CommentItem
              userName='山田太郎'
              userCompany='所属名'
              avatar='/images/icons/user-icon00.svg'
              comment='コメントの内容が入りますコメントの内容が入りますコメントの内容が入りますコメントの内容が入ります'
              updatedAt='0000年00月00日00:00'
            />
            <CommentItem
              userName='山田太郎'
              userCompany='所属名'
              avatar='/images/icons/user-icon00.svg'
              comment='コメントの内容が入りますコメントの内容が入りますコメントの内容が入りますコメントの内容が入ります'
              updatedAt='0000年00月00日00:00'
            />
          </ul>
        </section>
      </Container>
    </>
  )
}

export default SHRoomPostDetail
