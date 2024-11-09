import axios from 'axios'
import toast from 'react-hot-toast'

export const getMessageAction = async () => {
  try {
    const { data } = await axios.get(`/api/message/`)
    return data.messages
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}
