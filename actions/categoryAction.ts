/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'

export const getCategoryByIdAction = async (id: string, pageFlag: string = '0') => {
  try {
    const { data } = await axios.get(`/api/category/${id}`, {
      params: {
        pageFlag: pageFlag
      }
    })
    return data
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}
