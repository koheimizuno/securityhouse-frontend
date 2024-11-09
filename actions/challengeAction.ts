import axios from 'axios'
import toast from 'react-hot-toast'

export const getChallengeAction = async () => {
  try {
    const { data } = await axios.get(`/api/challenge/`)
    return data.challenges
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}

export const getChallengeByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/badge/${id}`)
    return data
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}
