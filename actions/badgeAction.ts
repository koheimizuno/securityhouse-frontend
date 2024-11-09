import axios from 'axios'
import toast from 'react-hot-toast'

export const getBadgeAction = async () => {
  try {
    const { data } = await axios.get(`/api/badge/`)
    return data.badges
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}

export const getBadgeByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/badge/${id}`)
    return data
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}
