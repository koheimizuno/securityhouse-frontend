import axios from 'axios'

export const getNewsAction = async (user_id: string) => {
  try {
    const { data } = await axios.get(`/api/news/`, {
      params: { user_id }
    })
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
