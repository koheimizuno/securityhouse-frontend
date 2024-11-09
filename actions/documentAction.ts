import axios from 'axios'
import toast from 'react-hot-toast'

export const getDocumentsAction = async () => {
  try {
    const { data } = await axios.get('/api/document/')
    return data.documents
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}

export const getDocumentByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/document/${id}`)
    return data
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}
