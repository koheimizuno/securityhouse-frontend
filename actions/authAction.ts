/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'

export const getUsersAction = async () => {
  try {
    const { data } = await axios.get(`/api/user/`)
    return data.users
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}

export const getUserByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/user/${id}`)
    return data
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}
