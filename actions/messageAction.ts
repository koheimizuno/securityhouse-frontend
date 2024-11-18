/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'

export const createMessageAction = async (payload: FormData) => {
  try {
    const { data } = await axios.post(`/api/message/`, payload)
    toast.success('メッセージが成果的に送信されました。')
    return data
  } catch (err: any) {
    toast.error(err.response.data.message)
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
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}

export const editMessageAction = async (payload: FormData) => {
  try {
    const { data } = await axios.put(`/api/message/`, payload)
    toast.success('メッセージが成果的に変更されました。')
    return data
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}
