import axios from 'axios'

export const getDocumentsAction = async () => {
  try {
    const { data } = await axios.get('/api/document/')
    return data.documents
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getDocumentByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/document/${id}`)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
