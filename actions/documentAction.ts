/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'

export const getDocumentsAction = async ({
  category_id,
  type_id,
  user_id
}: {
  category_id?: number
  type_id: number
  user_id: number
}) => {
  try {
    const { data } = await axios.get('/api/document/', {
      params: {
        category_id,
        type_id,
        user_id
      }
    })
    return data.documents
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}

export const getDocumentByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/document/${id}`)
    return data
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}
