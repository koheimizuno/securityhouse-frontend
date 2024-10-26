import axios from 'axios'

export const getChallengeAction = async () => {
  try {
    const { data } = await axios.get(`/api/challenge/`)
    return data.challenges
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getChallengeByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/badge/${id}`)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
