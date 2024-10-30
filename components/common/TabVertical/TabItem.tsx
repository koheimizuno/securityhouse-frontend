import React, { memo } from 'react'
import Image from 'next/image'

import { getImageAlt } from '@/utils/getImageAlt'
import PostTabType from '@/types/postTabType'

type TabItemProps = {
  item: PostTabType
  index: number
  tab: string
  gap?: boolean
  handleTab: (e: React.MouseEvent<HTMLLIElement>, title: string, index: number) => void
}

const TabItem = ({ item, index, tab, gap, handleTab }: TabItemProps) => {
  return (
    <li
      className={`border sm:flex sm:flex-row sm:items-center sm:gap-2  p-3 lg:px-6 lg:h-[72px] lg:gap-4 ${
        gap ? 'rounded-xl' : 'rounded-t-lg lg:rounded-none lg:rounded-l-xl'
      } cursor-pointer shadow-lg transition-all duration-500 ${
        tab === (index + 1).toString()
          ? 'bg-primary border-primary'
          : 'bg-white border-colorGray1 hover:bg-hoverPrimary hover:border-hoverPrimary'
      }`}
      data-value={index + 1}
      onClick={e => handleTab(e, item.title, index)}
    >
      <div className='lg:w-[50px]'>
        <Image
          src={tab === (index + 1).toString() ? item.icon[1] : item.icon[0]}
          alt={tab === (index + 1).toString() ? getImageAlt(item.icon[1]) || '' : getImageAlt(item.icon[0]) || ''}
          className='w-[25px] h-[25px] m-auto md:w-[28px] md:h-[28px] lg:m-0 text-primary'
          width={28}
          height={28}
        />
      </div>
      <p
        className={`hidden font-bold sm:block lg:flex lg:items-center lg:justify-between lg:w-full lg:gap-2 ${
          tab === (index + 1).toString() && 'text-white'
        } lg:text-[18px] xl:gap-6`}
      >
        <span dangerouslySetInnerHTML={{ __html: item.title }}></span>
        <Image
          src={tab === (index + 1).toString() ? '/images/icons/arrow-right-white.svg' : '/images/icons/arrow-right.svg'}
          alt={tab === (index + 1).toString() ? 'arrow-right-white' : 'arrow-right'}
          className='w-[6px] h-[12px] hidden lg:block'
          width={6}
          height={12}
        />
      </p>
    </li>
  )
}

export default memo(TabItem)
