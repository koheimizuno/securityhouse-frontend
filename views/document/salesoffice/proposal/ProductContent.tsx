'use client'

import DocCardButton from '@/views/document/DocCardButton'

const ProductContent = () => {
  return (
    <div className='md:w-[calc(100%-246px)] flex flex-col gap-2'>
      <DocCardButton title='タイトルが入ります。タイトルが入ります。' size='lg' />
      <DocCardButton title='タイトルが入ります。タイトルが入ります。' size='lg' />
      <DocCardButton title='タイトルが入ります。タイトルが入ります。' size='lg' />
    </div>
  )
}

export default ProductContent
