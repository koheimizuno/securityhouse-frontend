import { PostType_Type } from '@/types/postType'

export const getTitleById = (array: PostType_Type[], id: number) => {
  const item = array.find(element => element.id === id);
  return item && item.title;
};
