import axios from 'axios'

export const getRankingsAction = async () => {
  try {
    const { data } = await axios.get(`/api/ranking/`)
    return data.rankings
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getRankingByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/ranking/${id}`)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
