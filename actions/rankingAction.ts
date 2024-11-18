/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'

export const getRankingsAction = async () => {
  try {
    const { data } = await axios.get(`/api/ranking/`)
    return data.rankings
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}

export const getRankingByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/ranking/${id}`)
    return data
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}
