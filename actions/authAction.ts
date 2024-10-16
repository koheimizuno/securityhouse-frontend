import axios from 'axios'

export const getUserAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/user/${id}`)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
