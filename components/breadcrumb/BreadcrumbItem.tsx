import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'

type BreadcrumbItemProps = {
  label: string
  href: string
  validSlug: boolean
}

const BreadcrumbItem = ({ item }: { item: BreadcrumbItemProps }) => {
  return (
    <div className='flex items-center gap-2'>
      <Image
        src='/images/arrow-right-gray.svg'
        alt='arrow-right-gray'
        className='w-[10px] h-[10px]'
        width={4}
        height={8}
      />
      {item.validSlug ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
    </div>
  )
}

export default memo(BreadcrumbItem)
