import axios from 'axios'

export const getMessageAction = async () => {
  try {
    const { data } = await axios.get(`/api/message/`)
    return data.messages
  } catch (err) {
    console.error(err)
    throw err
  }
}
