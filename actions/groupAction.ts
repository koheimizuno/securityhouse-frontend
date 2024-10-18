import axios from 'axios'

export const getGroupByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/group/${id}`)
    return data
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}
