import axios from 'axios'

export const getNewsAction = async () => {
  try {
    const { data } = await axios.get(`/api/news/`)
    return data.news
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}

export const getNewsByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/news/${id}`)
    return data
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}
