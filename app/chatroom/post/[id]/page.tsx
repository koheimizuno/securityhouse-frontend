'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import Container from '@/components/layout/Container'
import SectionTitle from '@/components/common/SectionTitle'
import CommentItem from '@/views/comment/CommentItem'
import Loading from '@/components/common/Loading'
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Textarea
} from '@nextui-org/react'

import { PostType } from '@/types/postType'
import { CommentType } from '@/types/commentType'
import { getImageAlt } from '@/utils/getImageAlt'
import {
  deletePostBookmarkAction,
  deletePostLikeAction,
  getPostByIdAction,
  postBookmarkAction,
  postLikeAction
} from '@/actions/postAction'
import { createCommentAction, getCommentsAction } from '@/actions/commentAction'
import { deletePostAction, postReportAction } from '@/redux-store/slices/postSlice'
import { getCategoryAction } from '@/redux-store/slices/categorySlice'
import { RootState } from '@/redux-store'
import DeletePostModal from '@/components/modal/DeletePostModal'
import { useAuthentication } from '@/hooks/AuthContext'
import getPostTypeById from '@/utils/getPostTypeByID'
import { formatDate } from '@/utils/formatDate'

const SHRoomPostDetailPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const [postData, setPostData] = useState<PostType | null>(null)
  const [comments, setComments] = useState<CommentType[] | null>(null)
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
  const { session_user_id } = useAuthentication()

  const openModal = () => setIsOpen(true)
  const closeModal = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (typeof id === 'string') {
      getPostByIdAction({ user_id: session_user_id, id }).then(data => {
        setPostData(data)
      })
      getCommentsAction({ post_id: id }).then(data => {
        setComments(data)
      })
    }
  }, [id, session_user_id])

  useEffect(() => {
    dispatch(
      getCategoryAction({
        pageFlag: '0',
        type_id: postData?.type_id
      })
    )
  }, [dispatch, postData?.type_id])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, [])

  const handleDeletePost = useCallback(async () => {
    await dispatch(deletePostAction(id))
    closeModal()
    setTimeout(() => {
      router.push('/chatroom/sh-room')
    }, 2000)
  }, [dispatch, router, id, closeModal])

  const handleLike = () => {
    if (typeof id === 'string') {
      if (postData?.nice_flag) {
        if (id)
          deletePostLikeAction({ id: Number(id), user_id: session_user_id }).then(data => {
            setPostData(prev => {
              if (prev !== null) return { ...prev, like_count: data.like_count, nice_flag: data.like_status }
              else return null
            })
          })
      } else {
        if (id)
          postLikeAction({ id: Number(id), user_id: session_user_id }).then(data => {
            setPostData(prev => {
              if (prev !== null) return { ...prev, like_count: data.like_count, nice_flag: data.like_status }
              else return null
            })
          })
      }
    }
  }

  const handleBookmark = () => {
    if (typeof id === 'string') {
      if (postData?.bookmark_flag) {
        if (id)
          deletePostBookmarkAction({ post_id: Number(id), user_id: session_user_id }).then(data => {
            setPostData(prev => {
              if (prev !== null) return { ...prev, bookmark_flag: data }
              else return null
            })
          })
      } else {
        if (id)
          postBookmarkAction({ post_id: Number(id), user_id: session_user_id }).then(data => {
            setPostData(prev => {
              if (prev !== null) return { ...prev, bookmark_flag: data }
              else return null
            })
          })
      }
    }
  }

  const handleReport = async () => {
    await dispatch(postReportAction(id))
  }

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validateForm()) {
      const commentPayload = new FormData()

      if (typeof id === 'string') commentPayload.append('post_id', id)
      commentPayload.append('user_id', session_user_id)
      commentPayload.append('content', newComment.content)
      commentPayload.append('comment_id', '0')
      commentPayload.append('attachment', newComment.attachment.file)
      const newCommentRes = await createCommentAction(commentPayload)
      setComments(prev => {
        if (prev !== null) return [...prev, newCommentRes]
        else return null
      })
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
    <Container className='py-12 flex flex-col gap-12'>
      <section className='flex flex-col gap-8'>
        <SectionTitle
          title={`${getPostTypeById(postData.type_id).title}トークルーム`}
          icon={`/images/icons/${getPostTypeById(postData.type_id).slug}-room-secondary.svg`}
        />
        <div className='flex flex-col gap-4 md:gap-8 bg-bgSemiblue px-6  md:px-16 py-10 rounded-2xl'>
          <Button size='sm' color='primary' disabled className='md:hidden text-xs px-2 py-0 h-6 rounded-full w-fit'>
            {postData.category_name && postData.category_name}
          </Button>
          <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-row items-center gap-6'>
              <div className='flex items-center gap-2 mt-4 mb-3 text-sm md:text-base'>
                <Image src={postData.thumbnail} alt={getImageAlt(postData.thumbnail) || ''} width={44} height={44} />
                <div>
                  <p className='text-sm'>
                    {postData.name}／{postData.affiliation_name}
                  </p>
                  <p>{formatDate(postData.created_at)}</p>
                </div>
              </div>
              <Button
                size='sm'
                color='primary'
                disabled
                className='hidden md:block text-xs px-2 py-0 h-6 rounded-full w-fit'
              >
                {postData.category_name && postData.category_name}
              </Button>
            </div>
            <Dropdown>
              <DropdownTrigger className='cursor-pointer'>
                <Image src='/images/icons/more-icon.svg' alt='more-icon' width={32} height={32} />
              </DropdownTrigger>
              {postData.user_id === session_user_id ? (
                <DropdownMenu aria-label='Static Actions'>
                  <DropdownItem key='edit'>
                    <Link href={`/chatroom/post/edit/${id}`}>編集する</Link>
                  </DropdownItem>
                  <DropdownItem key='delete' className='text-danger' color='danger' onClick={openModal}>
                    削除する
                  </DropdownItem>
                </DropdownMenu>
              ) : (
                <DropdownMenu aria-label='Static Actions'>
                  <DropdownItem key='report' onClick={handleReport}>
                    通報する
                  </DropdownItem>
                </DropdownMenu>
              )}
            </Dropdown>
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
              <Image
                src={`${postData.nice_flag ? '/images/icons/thumb-up-fill.svg' : '/images/icons/thumb-up-outline.svg'}`}
                alt='thumb-up'
                width={25}
                height={25}
              />
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
                  postData.bookmark_flag ? '/images/icons/bookmark-fill.svg' : '/images/icons/bookmark-icon-black.svg'
                }
                alt={postData.bookmark_flag ? 'bookmark-fill.svg' : 'bookmark-icon-black.svg'}
                className='w-8 h-8'
                width={32}
                height={32}
              />
            </button>
          </div>
          <Divider className='h-[2px]' />
          <form className='flex flex-col gap-8' onSubmit={handleCommentSubmit}>
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
      <section className='flex flex-col gap-8'>
        <SectionTitle title='コメント' icon='/images/icons/comment-icon-secondary.svg' />
        {comments ? (
          <ul className='flex flex-col gap-8'>
            {comments
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map(comment => (
                <CommentItem
                  key={comment.id}
                  userName={comment.user_name}
                  userCompany={comment.affiliation_name}
                  avatar={comment.thumbnail}
                  comment={comment.content}
                  created_at={comment.created_at}
                />
              ))}
          </ul>
        ) : (
          <Loading flag='2' />
        )}
      </section>
      <DeletePostModal isOpen={isOpen} onClose={closeModal} onSubmit={handleDeletePost} />
    </Container>
  )
}

export default SHRoomPostDetailPage
