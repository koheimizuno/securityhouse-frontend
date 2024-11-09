'use client'

import { useState } from 'react'

import Container from '@/components/layout/Container'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

const SearchBar = () => {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle Search Logic
    console.log(keyword)
    router.push('/search')
  }

  return (
    <section className='bg-[#f2f2f2]'>
      <Container>
        <div className='flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 py-6'>
          <p className='text-[16px] font-bold'>キーワード検索</p>
          <form className='flex items-center' onSubmit={handleSearch}>
            <input
              name='keyword'
              className='bg-white lg:w-[400px] rounded-l-full w-full h-10 md:h-12 bg-colorGray1 border border-colorGray2 focus:outline-none py-2 px-4 rounded-md'
              placeholder='ハッシュタグ、アカウント、資料、品番検索'
              onChange={handleChange}
            />
            <Button
              type='submit'
              color='primary'
              className='rounded-none rounded-r-full px-4 w-[100px] lg:w-[200px] h-10 md:h-12 border border-primary'
            >
              検索する
            </Button>
          </form>
        </div>
      </Container>
    </section>
  )
}

export default SearchBar
