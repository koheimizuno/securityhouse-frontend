import axios from 'axios'

export const getNewsAction = async () => {
  try {
    const { data } = await axios.get(`/api/news/`)
    return data.news
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getNewsByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/news/${id}`)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
