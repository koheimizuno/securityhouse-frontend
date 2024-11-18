/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'

export const getChallengeAction = async () => {
  try {
    const { data } = await axios.get(`/api/challenge/`)
    return data.challenges
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}

export const getChallengeByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/badge/${id}`)
    return data
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}
