const getPostTypeById = (id: number) => {
  const postTypeArr = ['全て', 'SH会', '仕事', '交流', '社長室']
  return postTypeArr[id]
}

export default getPostTypeById
