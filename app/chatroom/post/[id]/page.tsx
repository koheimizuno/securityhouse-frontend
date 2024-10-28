'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import Breadcrumb from '@/components/breadcrumb'
import SearchBar from '@/components/common/SearchBar'
import CommentItem from '@/views/comment/CommentItem'
import Loading from '@/components/common/Loading'
import { Button, Divider, Input, Textarea } from '@nextui-org/react'

import { PostType } from '@/types/postType'
import { CommentType } from '@/types/commentType'
import { CategoryType } from '@/types/categoryType'
import { useClickAway } from '@uidotdev/usehooks'
import { getImageAlt } from '@/utils/getImageAlt'
import { getPostByIdAction } from '@/actions/postAction'
import { getCommentsAction } from '@/actions/commentAction'
import { deletePostAction } from '@/redux-store/slices/postSlice'
import { getCategoryAction } from '@/redux-store/slices/categorySlice'
import { createCommentAction } from '@/redux-store/slices/commentSlice'
import { RootState } from '@/redux-store'
import DeletePostModal from '@/components/modal/DeletePostModal'

const SHRoomPostDetail = () => {
  const { id } = useParams()
  const pathname = usePathname()
  const dispatch = useDispatch()
  const [postData, setPostData] = useState<PostType | null>(null)
  const [comments, setComments] = useState<CommentType[]>()
  const [moreActive, setMoreActive] = useState<boolean>(false)
  const { categories } = useSelector((state: RootState) => state.category)
  const [newComment, setNewComment] = useState({
    content: '',
    attachment: {
      file: '',
      preview: ''
    }
  })
  const [errors, setErrors] = useState({
    content: '',
    attachment: ''
  })
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openModal = () => setIsOpen(true)
  const closeModal = useCallback(() => setIsOpen(false), [])

  const category = useMemo(() => {
    return categories?.find((category: CategoryType) => category.id === postData?.category_id)?.title || ''
  }, [categories, postData?.category_id])

  const ref = useClickAway<HTMLDivElement>(() => {
    setMoreActive(false)
  })

  useEffect(() => {
    if (typeof id === 'string') {
      getPostByIdAction(id).then(data => {
        setPostData(data)
      })
      getCommentsAction({ post_id: id }).then(data => {
        setComments(data)
      })
    }
  }, [id])

  useEffect(() => {
    dispatch(
      getCategoryAction({
        pageFlag: '0',
        type_id: postData?.type_id
      })
    )
  }, [dispatch, postData?.type_id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, files } = e.target
    if (type === 'file') {
      const file = files ? files[0] : null
      const imageUrl = file ? URL.createObjectURL(file) : ''
      setNewComment(prev => ({
        ...prev,
        [name]: {
          file: file,
          preview: imageUrl
        }
      }))
    } else {
      setNewComment(prev => ({ ...prev, [name]: value }))
    }
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleDeletePost = async () => {
    await dispatch(deletePostAction(id))
    setMoreActive(false)
  }

  const handleLike = () => {}
  const handleBookmark = () => {}

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validateForm()) {
      const commentPayload = new FormData()

      if (typeof id === 'string') commentPayload.append('post_id', id)
      commentPayload.append('content', newComment.content)
      commentPayload.append('attachment', newComment.attachment.file)

      dispatch(createCommentAction(commentPayload))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!newComment.content) newErrors.content = 'この項目は必須です。'
    if (!newComment.attachment.file) newErrors.attachment = 'この項目は必須です。'

    setErrors(prev => ({ ...prev, ...newErrors }))
    return Object.keys(newErrors).length === 0
  }

  if (!postData || !categories) {
    return <Loading flag='1' />
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
                    <p className='text-sm'>{postData.name}／所属名</p>
                    <p>0000年00月00日00:00</p>
                  </div>
                </div>
                <div className='flex items-center flex-wrap gap-2'>
                  <Button size='sm' color='primary' disabled className='text-xs px-2 py-0 h-6 rounded-full w-fit'>
                    {category && category}
                  </Button>
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
                    <li className='px-6 py-2 rounded-md hover:bg-colorGray1 cursor-pointer'>
                      <button onClick={openModal}>削除する</button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <h3 className='text-xl font-bold truncate text-txtColor'>{postData?.title}</h3>
            <p>{postData?.content}</p>
            <Image
              src={postData.attachments}
              alt={getImageAlt(postData.attachments) || ''}
              className='w-full h-auto max-h-[300px]'
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
                  <span className='ms-2'>{postData.like_count || '0'}件</span>
                </p>
              </div>
              <button onClick={handleBookmark}>
                <Image
                  src={
                    postData.bookmark_flag === '1'
                      ? '/images/icons/bookmark-fill.svg'
                      : '/images/icons/bookmark-icon-black.svg'
                  }
                  alt={postData.bookmark_flag === '1' ? 'bookmark-fill.svg' : 'bookmark-icon-black.svg'}
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
                name='content'
                label='コメント'
                placeholder='コメント内容を入力してください。'
                className='font-bold'
                labelPlacement='outside'
                isInvalid={errors.content ? true : false}
                color={errors.content ? 'danger' : 'default'}
                errorMessage={errors.content}
                onChange={handleChange}
                size='lg'
                isRequired
              />
              <Input
                type='file'
                name='attachment'
                label='プロフィール画像'
                className='font-bold'
                placeholder='アップ'
                labelPlacement='outside'
                isInvalid={errors.attachment ? true : false}
                color={errors.attachment ? 'danger' : 'default'}
                errorMessage={errors.attachment}
                onChange={handleChange}
                size='lg'
                isRequired
              />
              {newComment.attachment.preview && (
                <Image
                  src={newComment.attachment.preview}
                  alt='Selected'
                  className='mt-2 w-32 h-w-32'
                  width={50}
                  height={50}
                />
              )}
              <Button type='submit' color='primary' size='lg'>
                コメントする
              </Button>
            </form>
          </div>
        </section>
        <section className='py-12'>
          <PageHeader title='コメント' />
          {comments ? (
            <ul className='flex flex-col gap-10'>
              {comments.map(comment => (
                <CommentItem
                  key={comment.id}
                  userName='山田太郎'
                  userCompany='所属名'
                  avatar='/images/icons/user-icon00.svg'
                  comment={comment.content}
                  updatedAt={comment.updated_at}
                />
              ))}
            </ul>
          ) : (
            <Loading flag='2' />
          )}
        </section>
        <DeletePostModal isOpen={isOpen} onClose={closeModal} onSubmit={handleDeletePost} />
      </Container>
    </>
  )
}

export default SHRoomPostDetail
