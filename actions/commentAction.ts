import axios from 'axios'
import toast from 'react-hot-toast'

export const getCommentsAction = async ({ post_id }: { post_id: string }) => {
  try {
    const { data } = await axios.get(`/api/comment/`, { params: { post_id } })
    return data.comments
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getCommentByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/comment/${id}`)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const createCommentAction = async (payload: FormData) => {
  try {
    const { data } = await axios.post(`/api/comment/`, payload)
    toast.success('コメントが正常に作成されました。')
    return data
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    console.error(err)
    throw err
  }
}
