import axios from 'axios'

export const getGroupByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/group/${id}`)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
