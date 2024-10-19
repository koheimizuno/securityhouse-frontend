import { memo } from 'react'
import Image from 'next/image'
import { PostCategoryType } from '@/types/postType'

type CategoryItemProps = {
  item: PostCategoryType
  cat: string
  handleCategory: (segment: string) => void
}

const CategoryItem = ({ item, cat, handleCategory }: CategoryItemProps) => {
  return (
    <li
      className={`flex items-center gap-2 text-sm rounded-full ps-5 pe-2 py-2 cursor-pointer ${
        cat === item.segment && 'bg-primary text-white'
      }`}
      onClick={() => handleCategory(item.segment)}
    >
      <Image
        src={cat === item.segment ? '/images/arrow-right-white.svg' : '/images/arrow-right.svg'}
        alt={cat === item.segment ? 'arrow-right-white' : 'arrow-right'}
        className='w-[6px] h-[12px] hidden lg:block'
        width={6}
        height={12}
      />
      <span>{item.label}</span>
    </li>
  )
}

export default memo(CategoryItem)
