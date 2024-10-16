import axios from 'axios'

export const getPostsAction = async () => {
  try {
    const { data } = await axios.get('/api/posts/')
    return data
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}

export const getPostByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/post/${id}`)
    return data
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}
