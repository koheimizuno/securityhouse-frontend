import { memo } from 'react'
import Image from 'next/image'
import { CategoryType } from '@/types/categoryType'

type CategoryItemProps = {
  item: CategoryType
  cat: string
  handleCategory: (segment: string) => void
  toggleMenu: () => void
}

const CategoryItem = ({ item, cat, handleCategory, toggleMenu }: CategoryItemProps) => {
  const handleClick = () => {
    handleCategory(item.title)
    toggleMenu()
  }
  return (
    <li
      className={`flex items-center gap-2 text-sm rounded-full ps-5 pe-2 py-2 cursor-pointer hover:bg-hoverPrimary transition-all duration-300 ${
        cat === item.title && 'bg-primary text-white'
      }`}
      onClick={handleClick}
    >
      <Image
        src={cat === item.title ? '/images/icons/arrow-right-white.svg' : '/images/icons/arrow-right.svg'}
        alt={cat === item.title ? 'arrow-right-white' : 'arrow-right'}
        className='w-[6px] h-[12px] hidden lg:block'
        width={6}
        height={12}
      />
      <span>{item.title}</span>
    </li>
  )
}

export default memo(CategoryItem)
