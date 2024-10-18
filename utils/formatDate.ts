const formatDate = (input: string): string => {
  const date = new Date(input)

  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Months are zero-indexed
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${year}年${month}月${day}日 ${hours}:${minutes < 10 ? '0' : ''}${minutes}`
}

export default formatDate
