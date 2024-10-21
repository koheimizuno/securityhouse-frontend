'use client'

import Image from 'next/image'
import React from 'react'
import CustomButton from '../common/CustomButton'

const Footer = () => {
  const handleMoveTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  return (
    <footer className='relative bg-white py-8 border-t border-b border-borderColor'>
      <div className='px-[20px] md:px-[80px] lg:px-[180px] mx-auto'>
        <div className='flex justify-between items-center gap-8 lg:gap-[148px]'>
          <div className='flex flex-col items-start gap-0'>
            <Image
              src='/images/logo.svg'
              alt='Logo'
              className='w-[125px] h-[24px] lg:w-[250px] lg:h-[47px]'
              width={250}
              height={47}
              priority
            />
            <p className='text-[12px] lg:text-[15px] font-bold text-[#333] ps-2 md:ps-0'>SH会員専用ページ</p>
          </div>
          <div className='flex flex-row justify-between items-center gap-10'>
            <ul className='hidden md:flex flex-row flex-wrap items-start gap-10'>
              <li>
                <a href='#' className='flex flex-row justify-between items-center gap-2 w-[120px]'>
                  <span className='text-[15px] font-bold'>TOP</span>
                  <Image
                    src='/images/arrow-right.svg'
                    alt='arrow-right'
                    className='w-[5px] h-[10px]'
                    width={5}
                    height={10}
                  />
                </a>
              </li>
              <li>
                <a href='#' className='flex flex-row justify-between items-center gap-2 w-[120px]'>
                  <span className='text-[15px] font-bold'>トークルーム</span>
                  <Image
                    src='/images/arrow-right.svg'
                    alt='arrow-right'
                    className='w-[5px] h-[10px]'
                    width={5}
                    height={10}
                  />
                </a>
              </li>
              <li>
                <a href='#' className='flex flex-row justify-between items-center gap-2 w-[120px]'>
                  <span className='text-[15px] font-bold'>SH会情報</span>
                  <Image
                    src='/images/arrow-right.svg'
                    alt='arrow-right'
                    className='w-[5px] h-[10px]'
                    width={5}
                    height={10}
                  />
                </a>
              </li>
              <li>
                <a href='#' className='flex flex-row justify-between items-center gap-2 w-[120px]'>
                  <span className='text-[15px] font-bold'>お知らせ</span>
                  <Image
                    src='/images/arrow-right.svg'
                    alt='arrow-right'
                    className='w-[5px] h-[10px]'
                    width={5}
                    height={10}
                  />
                </a>
              </li>
              <li>
                <a href='#' className='flex flex-row justify-between items-center gap-2 w-[120px]'>
                  <span className='text-[15px] font-bold'>資料集</span>
                  <Image
                    src='/images/arrow-right.svg'
                    alt='arrow-right'
                    className='w-[5px] h-[10px]'
                    width={5}
                    height={10}
                  />
                </a>
              </li>
            </ul>
            <CustomButton
              onClick={() => {}}
              value='マイページ'
              outline={false}
              spTxtHidden={true}
              size='lg'
              icon='/images/user-icon.svg'
              className='px-8 py-3 md:w-[200px] md:h-[56px]'
            />
          </div>
        </div>
        <hr className='my-6' />
        <div className='flex flex-col items-center sm:flex-row sm:justify-between gap-4'>
          <p className='text-[12px] text-[#333]'>©Security House Center Co.,LTD. All rights reserved.</p>
          <a href='' className='text-[14px] font-bold underline whitespace-nowrap'>
            サイトマップ
          </a>
        </div>
      </div>
      <div className='absolute bottom-20 right-10 cursor-pointer' onClick={handleMoveTop}>
        <Image src='/images/page-top.svg' alt='page-top' width={40} height={40} />
      </div>
    </footer>
  )
}

export default Footer
