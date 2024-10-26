import axios from 'axios'

export const getCommentsAction = async ({ post_id }: { post_id: string }) => {
  try {
    const { data } = await axios.get(`/api/comment/`, { params: { post_id } })
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
