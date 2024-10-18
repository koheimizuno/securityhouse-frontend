import axios from 'axios'

export const getCategoryByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/category/${id}`)
    return data
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}
