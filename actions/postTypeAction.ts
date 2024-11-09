import axios from 'axios'
import toast from 'react-hot-toast'

export const getPostTypeByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/post_type/${id}`)
    return data
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}
