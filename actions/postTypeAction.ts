/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'

export const getPostTypeByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/post_type/${id}`)
    return data
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}
