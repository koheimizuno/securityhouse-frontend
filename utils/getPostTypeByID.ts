const getPostTypeById = (id: number) => {
  const postTypeArr = [
    { title: '全て', slug: '' },
    { title: 'SH会', slug: 'sh' },
    { title: '仕事', slug: 'work' },
    { title: '交流', slug: 'exchange' },
    { title: '社長室', slug: 'boss' }
  ]
  return postTypeArr[id]
}

export default getPostTypeById
