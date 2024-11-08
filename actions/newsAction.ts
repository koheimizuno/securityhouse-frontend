import axios from 'axios'
import toast from 'react-hot-toast'

export const getNewsAction = async ({ user_id }: { user_id: string }) => {
  try {
    const { data } = await axios.get(`/api/news/`, {
      params: { user_id }
    })
    return data.news
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getNewsByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/news/${id}`)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const newsBookmarkAction = async ({ id, user_id }: { id: number; user_id: string }) => {
  try {
    const { data } = await axios.post(`/api/news/bookmark/`, {
      params: {
        id,
        user_id
      }
    })
    toast.success('ブックマークに追加されました。')
    return data.bookmark_flag
  } catch (err) {
    console.error(err)
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}

export const deleteNewsBookmarkAction = async ({ id, user_id }: { id: number; user_id: string }) => {
  try {
    const { data } = await axios.delete(`/api/news/bookmark/`, {
      params: {
        id,
        user_id
      }
    })
    toast.success('ブックマークから削除されました。')
    return data.bookmark_flag
  } catch (err) {
    console.error(err)
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}
