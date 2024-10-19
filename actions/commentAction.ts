import axios from 'axios'

export const getCommentsAction = async () => {
  try {
    const { data } = await axios.get(`/api/comment/`)
    return data.comments
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}

export const getCommentByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/comment/${id}`)
    return data
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}
