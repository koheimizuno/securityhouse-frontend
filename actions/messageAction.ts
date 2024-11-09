import axios from 'axios'
import toast from 'react-hot-toast'

export const createMessageAction = async (payload: FormData) => {
  try {
    const { data } = await axios.post(`/api/message/`, payload)
    toast.success('メッセージが成果的に送信されました。')
    return data
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}

export const getMessageAction = async ({ sender, receiver }: { sender: string; receiver: string }) => {
  try {
    const { data } = await axios.get(`/api/message/`, {
      params: {
        sender,
        receiver
      }
    })
    return data.messages
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}

export const editMessageAction = async (payload: FormData) => {
  try {
    const { data } = await axios.put(`/api/message/`, payload)
    toast.success('メッセージが成果的に変更されました。')
    return data
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}
