import axios from 'axios'
import toast from 'react-hot-toast'

export const getUsersAction = async () => {
  try {
    const { data } = await axios.get(`/api/user/`)
    return data.users
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}

export const getUserByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/user/${id}`)
    return data
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}
