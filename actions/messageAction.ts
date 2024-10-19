import axios from 'axios'

export const getMessageAction = async () => {
  try {
    const { data } = await axios.get(`/api/message/`)
    return data.messages
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}
