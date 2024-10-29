'use client'

import { useMemo } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Container from '@/components/layout/Container'
import { getBreadcrumbs } from '@/utils/getBreadcrumbs'
import BreadcrumbItem from './BreadcrumbItem'

const Breadcrumb = () => {
  const pathName = usePathname()
  const memorizedPathName = useMemo(() => getBreadcrumbs(pathName), [pathName])

  return (
    <Container className='mt-[300px] sm:mt-[145px] md:mt-[123px]'>
      <div className='py-3 px-4 md:px-[60px] text-xs flex items-center gap-2'>
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/images/icons/home-icon.svg'
            alt='breadcrumb'
            className='w-[10px] h-[10px]'
            width={10}
            height={10}
          />
          <span>TOP</span>
        </Link>
        {memorizedPathName.map((item, index) => (
          <BreadcrumbItem key={index} item={item} />
        ))}
      </div>
    </Container>
  )
}

export default Breadcrumb
