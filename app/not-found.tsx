'use client'

import Link from 'next/link'

import Container from '@/components/layout/Container'
import { Button } from '@nextui-org/react'

const NotFound = () => {
  return (
    <Container>
      <div className='min-h-[calc(100vh-328.5px)] flex flex-grow items-center justify-center'>
        <div className='text-center'>
          <h1 className='mb-4 text-6xl font-bold'>404</h1>
          <p className='text-gray-600 text-xl'>Oops! The page you are looking for could not be found.</p>
          <Link href='/' className='inline-block my-8'>
            <Button color='primary' className='rounded-full'>
              Go back to Home
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default NotFound
