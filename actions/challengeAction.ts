import axios from 'axios'

export const getChallengeAction = async () => {
  try {
    const { data } = await axios.get(`/api/challenge/`)
    return data.challenges
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}

export const getChallengeByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/badge/${id}`)
    return data
  } catch (err) {
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}
