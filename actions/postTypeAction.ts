import axios from 'axios'

export const getPostTypeByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/post_type/${id}`)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
