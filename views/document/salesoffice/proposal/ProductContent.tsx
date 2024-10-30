'use client'

import Image from 'next/image'

const ProductContent = () => {
  return (
    <ul className='md:w-[calc(100%-246px)] flex flex-col gap-2'>
      <li className='bg-colorGray1 border border-colorGray3 px-4 py-5 rounded flex justify-between items-center gap-8'>
        <div className='flex items-center gap-3 md:gap-6'>
          <Image src='/images/icons/pdf-icon.svg' alt='pdf-icon' width={28} height={28} />
          <p className='text-sm md:text-base'>タイトルが入ります。タイトルが入ります。</p>
        </div>
        <Image src='/images/icons/download-icon.svg' alt='download-icon' width={20} height={20} />
      </li>
      <li className='bg-colorGray1 border border-colorGray3 px-4 py-5 rounded flex justify-between items-center gap-8'>
        <div className='flex items-center gap-3 md:gap-6'>
          <Image src='/images/icons/pdf-icon.svg' alt='pdf-icon' width={28} height={28} />
          <p className='text-sm md:text-base'>タイトルが入ります。タイトルが入ります。</p>
        </div>
        <Image src='/images/icons/download-icon.svg' alt='download-icon' width={20} height={20} />
      </li>
      <li className='bg-colorGray1 border border-colorGray3 px-4 py-5 rounded flex justify-between items-center gap-8'>
        <div className='flex items-center gap-3 md:gap-6'>
          <Image src='/images/icons/pdf-icon.svg' alt='pdf-icon' width={28} height={28} />
          <p className='text-sm md:text-base'>タイトルが入ります。タイトルが入ります。</p>
        </div>
        <Image src='/images/icons/download-icon.svg' alt='download-icon' width={20} height={20} />
      </li>
    </ul>
  )
}

export default ProductContent
