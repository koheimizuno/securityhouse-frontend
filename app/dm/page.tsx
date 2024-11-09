'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import { Input, Button, User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'

import { getUsersAction } from '@/actions/authAction'
import { UsersType } from '@/types/userType'
import { createMessageAction, getMessageAction } from '@/actions/messageAction'
import { useAuthentication } from '@/hooks/AuthContext'
import { MessageType } from '@/types/messageType'
import { deleteMessageAction } from '@/redux-store/slices/messageSlice'
import DeletePostModal from '@/components/modal/DeletePostModal'
import Loading from '@/components/common/Loading'

const DirectMessagePage = () => {
  const dispatch = useDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [users, setUsers] = useState<UsersType[]>([])
  const [messages, setMessages] = useState<MessageType[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [receiverId, setReceiverId] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [editFlag, setEditFlag] = useState(false)
  const { session_user_id } = useAuthentication()
  const formData = new FormData()

  const openModal = (id: string) => {
    setIsModalOpen(true)
    setDeleteId(id)
  }
  const closeModal = useCallback(() => setIsModalOpen(false), [])

  const handleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    getUsersAction().then(data => {
      setUsers(data)
      getMessageAction({
        sender: session_user_id,
        receiver: data[0].id
      }).then(data => setMessages(data))
    })
  }, [session_user_id])

  const getMessages = (user_id: string) => {
    getMessageAction({
      sender: session_user_id,
      receiver: user_id
    }).then(data => {
      setMessages(data)
      setReceiverId(data.receiver)
    })
  }

  const handleDivClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      formData.append('attachment', file)
      setFileName(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newMessage.trim()) {
      formData.append('sender', session_user_id)
      formData.append('receiver', receiverId)
      formData.append('content', newMessage)
      const newMessageRes = await createMessageAction(formData)
      setMessages(prev => [...prev, newMessageRes])
      setNewMessage('')
    }
  }

  const handleEditMessage = () => {}

  const handleDeletePost = async () => {
    await dispatch(deleteMessageAction(deleteId))
    closeModal()
  }

  if (messages.length === 0 || messages === null) {
    return <Loading flag='1' />
  }

  return (
    <Container className='w-full max-w-[1500px] px-6 sm:px-10 lg:px-12 pb-8 flex flex-col gap-8'>
      <PageHeader title='DM' subtitle='トップ' />
      <section className='flex flex-col gap-8'>
        <div className={`inline-block md:hidden ${isOpen && 'change'}`} onClick={handleMenu}>
          <div className='bar1'></div>
          <div className='bar2'></div>
          <div className='bar3'></div>
        </div>
        <div className='relative flex justify-between items-stretch gap-4 min-h-[500px]'>
          <div
            className={`max-sm:h-full max-md:absolute top-0 left-0 z-10 shadow-lg border-t border-colorGray1 bg-white rounded-lg md:p-0 overflow-hidden ${
              isOpen ? 'max-w-full px-4 py-6 border border-colorGray1 md:border-none' : 'max-w-0 md:max-w-none'
            }`}
          >
            <ul className='w-[250px] px-4 py-6 flex flex-col gap-2'>
              {users &&
                users.map(user => (
                  <li
                    key={user.id}
                    className='cursor-pointer hover:bg-bgSemiblue rounded-md px-4 py-2'
                    onClick={() => getMessages(user.id)}
                  >
                    <User
                      name={user.name}
                      avatarProps={{
                        src: user.thumbnail
                      }}
                    />
                  </li>
                ))}
            </ul>
          </div>
          <div className='w-full md:w-[calc(100%-270px)] flex flex-col gap-2 rounded-lg shadow-lg p-4 border-t border-colorGray1'>
            <div className='p-6 pl-0 w-full h-full mx-auto space-y-4 mb-4 max-h-96 overflow-y-auto secondary-scroll flex flex-col justify-end gap-8'>
              {messages ? (
                messages
                  .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                  .map(message => (
                    <div
                      key={message.id}
                      className={`w-full sm:w-2/3 flex gap-4
                     ${
                       message.sender == session_user_id
                         ? 'flex-row-reverse self-end text-right'
                         : 'flex-row self-start'
                     }`}
                    >
                      <div className='flex flex-col items-center gap-2'>
                        <Image
                          src='/images/icons/user-icon00.svg'
                          alt='user-icon'
                          width={70}
                          height={70}
                          className='p-1 rounded-full border border-primary border-dashed'
                        />
                        <p className='text-xs'>{users.find(user => user.id === message.sender)?.name}</p>
                      </div>
                      <div
                        className={`relative w-full mt-10 p-3 rounded-lg ${
                          message.sender == session_user_id ? 'bg-[#3f9afb] text-white' : 'bg-gray-200 text-black'
                        }`}
                      >
                        <p>{message.content}</p>
                        <div className='absolute top-0 -left-6'>
                          <Dropdown>
                            <DropdownTrigger className='cursor-pointer'>
                              <Image src='/images/icons/more-vertical.svg' alt='more-icon' width={20} height={20} />
                            </DropdownTrigger>
                            <DropdownMenu aria-label='Static Actions'>
                              <DropdownItem key='edit' onClick={handleEditMessage}>
                                編集する
                              </DropdownItem>
                              <DropdownItem
                                key='delete'
                                className='text-danger'
                                color='danger'
                                onClick={() => openModal(message.id)}
                              >
                                削除する
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                        <div
                          className={`absolute top-0 w-0 h-0 border-solid border-8 ${
                            message.sender == session_user_id
                              ? 'border-t-transparent border-l-transparent border-b-[#3f9afb] border-r-[#3f9afb] right-[-8px] mr-1 rotate-45'
                              : 'border-t-transparent border-r-transparent border-b-gray-200 border-l-gray-200 left-[-8px] ml-1 -rotate-45'
                          }`}
                        ></div>
                      </div>
                      <div className='flex items-end'>
                        <p className='text-nowrap text-xs'>{`${new Date(message.created_at).getHours()}:${
                          new Date(message.created_at).getMinutes() < 10 ? '0' : ''
                        } ${new Date(message.created_at).getMinutes()}`}</p>
                      </div>
                    </div>
                  ))
              ) : (
                <p className='py-36 text-center text-gray-500 flex justify-center items-center'>
                  表示するメッセージがありません。
                </p>
              )}
            </div>
            <form className='flex gap-6' onSubmit={handleSubmit}>
              <div className='w-full flex items-center gap-4'>
                <div className='flex items-center'>
                  <div className='cursor-pointer' onClick={handleDivClick}>
                    <Image
                      src='/images/icons/attachment.svg'
                      alt='attachment'
                      width={30}
                      height={30}
                      className='p-1 rounded-full'
                    />
                  </div>
                  <Input
                    ref={fileInputRef}
                    type='file'
                    name='attachments'
                    label='プロフィール画像'
                    placeholder='アップ'
                    size='lg'
                    onChange={handleFileChange}
                    className='hidden'
                  />
                </div>
                <div className={`relative w-full ${fileName && 'pt-4'}`}>
                  {fileName && <p className='absolute left-0 -top-7'>{fileName}</p>}
                  <Input
                    fullWidth
                    placeholder='Type a message...'
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    className='flex-grow'
                    size='lg'
                  />
                </div>
              </div>
              <Button type='submit' color='primary' className='rounded-full'>
                送信
              </Button>
            </form>
          </div>
        </div>
      </section>
      <DeletePostModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleDeletePost} />
    </Container>
  )
}

export default DirectMessagePage
