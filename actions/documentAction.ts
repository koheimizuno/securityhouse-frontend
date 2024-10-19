import axios from 'axios'

export const getDocumentsAction = async () => {
  try {
    const { data } = await axios.get('/api/document/')
    return data.documents
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}

export const getDocumentByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/document/${id}`)
    return data
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}
