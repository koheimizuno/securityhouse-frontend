const getPostTypeById = (id: string) => {
  const postTypeArr = ['全て', 'SH会', '仕事', '交流', '社長室']
  return postTypeArr[Number(id)]
}

export default getPostTypeById
