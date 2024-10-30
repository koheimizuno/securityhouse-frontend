'use client'

import { getImageAlt } from '@/utils/getImageAlt'
import Image from 'next/image'

import DocCardButton from './DocCardButton'

type DocumentCardProps = {
  img: string
  title: string
}

const DocumentCard = ({ img, title }: DocumentCardProps) => {
  return (
    <div className='w-[265px] flex flex-col gap-5'>
      <div className='relative h-[187px] bg-colorGray1 flex justify-center items-center max-w-full'>
        <Image src={img} alt={getImageAlt(img) || ''} width={231} height={163} className='h-full object-contain' />
        <Image
          src='/images/icons/add-icon-fill.svg'
          alt='add-icon-fill'
          width={29}
          height={29}
          className='absolute bottom-2 right-2 w-[29px]'
        />
      </div>
      <p>{title}</p>
      <DocCardButton title='ダウンロード' />
    </div>
  )
}

export default DocumentCard
