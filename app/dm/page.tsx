'use client'

import { useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import { Input, Button } from '@nextui-org/react'
import Image from 'next/image'

const mockMessages = [
  { id: 1, sender: 'Alice', content: 'Hi there!' },
  { id: 2, sender: 'Bob', content: 'Hello! How are you?' },
  { id: 2, sender: 'You', content: 'Hello! How are you?' },
  { id: 3, sender: 'Alice', content: 'I’m good, thanks! What about you?' }
]

const DirectMessagePage = () => {
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const newMessageObj = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage
      }
      setMessages([...messages, newMessageObj])
      setNewMessage('')
    }
  }

  return (
    <Container className='pb-8 flex flex-col gap-8'>
      <PageHeader title='DM' subtitle='トップ' />
      <div className='p-6 pl-0 w-full mx-auto space-y-4 mb-4 max-h-96 overflow-y-auto secondary-scroll flex flex-col gap-8'>
        {messages.length > 0 ? (
          messages.map(message => (
            <div
              key={message.id}
              className={`w-2/3 flex gap-4
                     ${message.sender === 'You' ? 'flex-row-reverse self-end text-right' : 'flex-row self-start'}`}
            >
              <div className='flex flex-col items-center gap-2'>
                <Image
                  src='/images/icons/user-icon00.svg'
                  alt='user-icon'
                  width={70}
                  height={70}
                  className='p-1 rounded-full border border-primary border-dashed'
                />
                <p>{message.sender}</p>
              </div>
              <div
                className={`relative w-full mt-10 p-3 rounded-lg ${
                  message.sender === 'You' ? 'bg-[#3f9afb] text-white' : 'bg-gray-200 text-black'
                }`}
              >
                <p>{message.content}</p>
                <div
                  className={`absolute top-0 w-0 h-0 border-solid border-8 ${
                    message.sender === 'You'
                      ? 'border-t-transparent border-l-transparent border-b-[#3f9afb] border-r-[#3f9afb] right-[-8px] mr-1 rotate-45'
                      : 'border-t-transparent border-r-transparent border-b-gray-200 border-l-gray-200 left-[-8px] ml-1 -rotate-45'
                  }`}
                ></div>
              </div>
              <div className='flex items-end'>
                <p>00:00</p>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500'>表示するメッセージがありません。</p>
        )}
      </div>
      <form className='input-area flex gap-6' onSubmit={handleSubmit}>
        <div className='w-full flex items-center gap-4'>
          <div className='flex items-center'>
            <div>
              <Image
                src='/images/icons/media-image.svg'
                alt='user-icon'
                width={30}
                height={30}
                className='p-1 rounded-full'
              />
            </div>
            <div>
              <Image
                src='/images/icons/attachment.svg'
                alt='user-icon'
                width={30}
                height={30}
                className='p-1 rounded-full'
              />
              <Input
                type='file'
                name='attachments'
                label='プロフィール画像'
                placeholder='アップ'
                size='lg'
                className='hidden'
              />
            </div>
          </div>
          <Input
            fullWidth
            placeholder='Type a message...'
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            className='flex-grow'
            size='lg'
          />
        </div>
        <Button color='primary' className='rounded-full'>
          送信
        </Button>
      </form>
    </Container>
  )
}

export default DirectMessagePage
