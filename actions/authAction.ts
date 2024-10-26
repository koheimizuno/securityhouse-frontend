import axios from 'axios'

export const getUsersAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/user/`)
    return data.users
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getUserByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/user/${id}`)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
