'use client'

import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import Container from '@/components/layout/Container'
import { Image, Link } from '@nextui-org/react'

const DocumentPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-8'>
      <PageHeader title='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='営業・事務' bar={true} divider={true} />
        <ul className='grid grid-cols-1 md:grid-cols-2 md:gap-x-[72px] gap-y-[20px] md:gap-y-[50px]'>
          <li className='py-4 md:py-8 bg-white border border-primary rounded-md hover:scale-[1.02] transition-all'>
            <Link
              href='/document/sales-office/flyer-proposal'
              className='flex flex-row justify-center md:flex-col gap-[30px]'
            >
              <Image className='w-10 md:w-auto' src='/images/icons/flyer-proposal-icon.png' alt='flyer-proposal-icon' />
              <span className='w-[112px] md:w-auto text-txtColor'>チラシ・提案書</span>
            </Link>
          </li>
          <li className='py-4 md:py-8 bg-white border border-primary rounded-md hover:scale-[1.02] transition-all'>
            <Link href='/document/sales-office/video' className='flex flex-row justify-center md:flex-col gap-[30px]'>
              <Image className='w-10 md:w-auto' src='/images/icons/video-icon.png' alt='video-icon' />
              <span className='w-[112px] md:w-auto text-txtColor'>動画</span>
            </Link>
          </li>
          <li className='py-4 md:py-8 bg-white border border-primary rounded-md hover:scale-[1.02] transition-all'>
            <Link
              href='/document/sales-office/promotion'
              className='flex flex-row justify-center md:flex-col gap-[30px]'
            >
              <Image className='w-10 md:w-auto' src='/images/icons/promotion-icon.png' alt='promotion-icon' />
              <span className='w-[112px] md:w-auto text-txtColor'>販促物</span>
            </Link>
          </li>
          <li className='py-4 md:py-8 bg-white border border-primary rounded-md hover:scale-[1.02] transition-all'>
            <Link
              href='/document/sales-office/document-system'
              className='flex flex-row justify-center md:flex-col gap-[30px]'
            >
              <Image
                className='w-10 md:w-auto'
                src='/images/icons/document-system-icon.png'
                alt='document-system-icon'
              />
              <span className='w-[112px] md:w-auto text-txtColor'>書類関係</span>
            </Link>
          </li>
        </ul>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='商品・技術' bar={true} divider={true} />
        <ul className='grid grid-cols-1 md:grid-cols-2 md:gap-x-[72px] gap-y-[20px] md:gap-y-[50px]'>
          <li className='py-4 md:py-8 bg-white border border-primary rounded-md hover:scale-[1.02] transition-all'>
            <Link
              href='/document/product-tech/sh-brand'
              className='flex flex-row justify-center md:flex-col gap-[30px]'
            >
              <Image className='w-10 md:w-auto' src='/images/icons/sh-brand-icon.png' alt='sh-brand-icon' />
              <span className='w-[112px] md:w-auto text-txtColor'>SHブランド</span>
            </Link>
          </li>
          <li className='py-4 md:py-8 bg-white border border-primary rounded-md hover:scale-[1.02] transition-all'>
            <Link
              href='/document/product-tech/takex-brand'
              className='flex flex-row justify-center md:flex-col gap-[30px]'
            >
              <Image className='w-10 md:w-auto' src='/images/icons/takex-brand-icon.png' alt='takex-brand-icon' />
              <span className='w-[112px] md:w-auto text-txtColor'>TAKEXブランド</span>
            </Link>
          </li>
          <li className='py-4 md:py-8 bg-white border border-primary rounded-md hover:scale-[1.02] transition-all'>
            <Link
              href='/document/product-tech/security-net'
              className='flex flex-row justify-center md:flex-col gap-[30px]'
            >
              <Image className='w-10 md:w-auto' src='/images/icons/security-net-icon.png' alt='security-net-icon' />
              <span className='w-[112px] md:w-auto text-txtColor'>セキュリティネット</span>
            </Link>
          </li>
          <li className='py-4 md:py-8 bg-white border border-primary rounded-md hover:scale-[1.02] transition-all'>
            <Link href='/document/product-tech/i-next' className='flex flex-row justify-center md:flex-col gap-[30px]'>
              <Image className='w-10 md:w-auto' src='/images/icons/i-next-icon.png' alt='i-next-icon' />
              <span className='w-[112px] md:w-auto text-txtColor'>i-NEXT</span>
            </Link>
          </li>
        </ul>
      </section>
    </Container>
  )
}

export default DocumentPage
