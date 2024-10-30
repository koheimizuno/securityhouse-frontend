import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'

type BreadcrumbItemProps = {
  label: string
  slug: string
  validSlug: boolean
  last: boolean
}

const BreadcrumbItem = ({ label, slug, validSlug, last }: BreadcrumbItemProps) => {
  return (
    <div className='flex items-center gap-2'>
      <Image
        src='/images/icons/arrow-right-gray.svg'
        alt='arrow-right-gray'
        className='w-[10px] h-[10px]'
        width={4}
        height={8}
      />
      {validSlug && !last ? (
        <Link href={slug} className='text-primary underline'>
          {label}
        </Link>
      ) : (
        <span>{label}</span>
      )}
    </div>
  )
}

export default memo(BreadcrumbItem)
