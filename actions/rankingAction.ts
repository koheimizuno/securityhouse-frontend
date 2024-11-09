import axios from 'axios'
import toast from 'react-hot-toast'

export const getRankingsAction = async () => {
  try {
    const { data } = await axios.get(`/api/ranking/`)
    return data.rankings
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}

export const getRankingByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/ranking/${id}`)
    return data
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}
