import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { getImageAlt } from '@/utils/getImageAlt'
import { PostTabType } from '@/types/postType'

type TabItemOtherProps = {
  item: PostTabType
  pathname: string
}

const TabItemOther = ({ item, pathname }: TabItemOtherProps) => {
  return (
    <li
      className={`border flex items-center p-3 lg:px-6 lg:h-[72px] rounded-xl cursor-pointer shadow-lg transition-all duration-500 ${
        pathname.includes(item.href)
          ? 'bg-primary border-primary text-white'
          : 'bg-white border-colorGray1 hover:bg-hoverPrimary hover:border-hoverPrimary'
      }`}
    >
      <Link href={item.href} className='sm:flex sm:flex-row sm:items-center sm:gap-2 lg:gap-2'>
        <div className='lg:w-[50px]'>
          <Image
            src={pathname.includes(item.href) ? item.icon[1] : item.icon[0]}
            alt={pathname.includes(item.href) ? getImageAlt(item.icon[1]) || '' : getImageAlt(item.icon[0]) || ''}
            className='w-[23px] h-[23px] m-auto lg:m-0 text-primary'
            width={28}
            height={28}
          />
        </div>
        <p
          className={`hidden font-bold sm:block lg:flex lg:items-center lg:justify-between lg:w-full lg:gap-2 ${
            pathname.includes(item.href) && 'text-white'
          } xl:gap-2`}
        >
          <span dangerouslySetInnerHTML={{ __html: item.title }}></span>
          <Image
            src={pathname.includes(item.href) ? '/images/arrow-right-white.svg' : '/images/arrow-right.svg'}
            alt={pathname.includes(item.href) ? 'arrow-right-white' : 'arrow-right'}
            className='w-[6px] h-[12px] hidden lg:block'
            width={6}
            height={12}
          />
        </p>
      </Link>
    </li>
  )
}

export default memo(TabItemOther)
