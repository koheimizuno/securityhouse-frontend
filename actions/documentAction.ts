/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'

export const getDocumentsAction = async () => {
  try {
    const { data } = await axios.get('/api/document/')
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

export const getDocumentVideoAction = async ({ user_id }: { user_id: number }) => {
  try {
    const { data } = await axios.post(`/api/movie/`, {
      params: {
        user_id
      }
    })
    return data.movies
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}
