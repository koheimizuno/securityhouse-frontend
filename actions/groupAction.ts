import axios from 'axios'
import toast from 'react-hot-toast'

export const getGroupByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/group/${id}`)
    return data
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}
