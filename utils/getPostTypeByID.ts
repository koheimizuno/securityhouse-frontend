const getPostTypeById = (id: number) => {
  const postTypeArr = [
    ['全て', ''],
    ['SH会', 'sh'],
    ['仕事', 'work'],
    ['交流', 'exchange'],
    ['社長室', 'boss']
  ]
  return postTypeArr[id]
}

export default getPostTypeById
