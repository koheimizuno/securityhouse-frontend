import axios from 'axios'

export const getCategoryByIdAction = async (id: string, pageFlag: string = '0') => {
  try {
    const { data } = await axios.get(`/api/category/${id}`, {
      params: {
        pageFlag: pageFlag
      }
    })
    return data
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}
