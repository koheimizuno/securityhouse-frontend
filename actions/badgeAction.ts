import axios from 'axios'

export const getBadgeAction = async () => {
  try {
    const { data } = await axios.get(`/api/badge/`)
    return data.badges
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getBadgeByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/badge/${id}`)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
