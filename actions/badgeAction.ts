import axios from 'axios'

export const getBadgeAction = async () => {
  try {
    const { data } = await axios.get(`/api/badge/`)
    return data.badges
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}

export const getBadgeByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/badge/${id}`)
    return data
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}
