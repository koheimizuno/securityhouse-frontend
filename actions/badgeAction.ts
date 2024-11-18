/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'

export const getBadgeAction = async () => {
  try {
    const { data } = await axios.get(`/api/badge/`)
    return data.badges
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}

export const getBadgeByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/badge/${id}`)
    return data
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}
