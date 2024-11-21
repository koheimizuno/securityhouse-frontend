/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'

export const getCommentsAction = async ({ post_id }: { post_id: string }) => {
  try {
    const { data } = await axios.get(`/api/comment/`, { params: { post_id } })
    return data.comments
  } catch (err: any) {
    toast.error(err.response?.data.message)
    throw err
  }
}

export const getCommentByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/comment/${id}`)
    return data
  } catch (err: any) {
    toast.error(err.response?.data.message)
    throw err
  }
}

export const createCommentAction = async (payload: FormData) => {
  try {
    const { data } = await axios.post(`/api/comment/`, payload)
    toast.success('コメントが正常に作成されました。')
    return data
  } catch (err: any) {
    toast.error(err.response?.data.message)
    throw err
  }
}
