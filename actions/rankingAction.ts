import axios from 'axios'

export const getRankingsAction = async () => {
  try {
    const { data } = await axios.get(`/api/ranking/`)
    return data.rankings
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}

export const getRankingByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/ranking/${id}`)
    return data
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}
