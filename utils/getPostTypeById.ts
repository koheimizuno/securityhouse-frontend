import { PostType_Type } from '@/types/postType'

export const getTitleById = (array: PostType_Type[], id: string) => {
  const item = array.find(element => element.id === id)
  return item ? item.title : null
}
