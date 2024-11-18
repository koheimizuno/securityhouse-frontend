/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'

export const getNewsAction = async ({ user_id }: { user_id: string }) => {
  try {
    const { data } = await axios.get(`/api/news/`, {
      params: { user_id }
    })
    return data.news
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}

export const getNewsByIdAction = async ({ id, user_id }: { id: number; user_id: string }) => {
  try {
    const { data } = await axios.get(`/api/news/${id}`, {
      params: {
        id,
        user_id
      }
    })
    return data
  } catch (err: any) {
    toast.error(err.response.data.message)
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
  } catch (err: any) {
    toast.error(err.response.data.message)
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
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}

export const newsLikeAction = async ({ id, user_id }: { id: number; user_id: string }) => {
  try {
    const { data } = await axios.post(`/api/news/like/`, { id, user_id })
    toast.success('お知らせに「いいね！」を追加しました。')
    return data
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}

export const deleteNewsLikeAction = async ({ id, user_id }: { id: number; user_id: string }) => {
  try {
    const { data } = await axios.delete(`/api/news/like/`, {
      params: {
        id,
        user_id
      }
    })
    toast.success('お知らせから「いいね！」を削除しました。')
    return data
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw err
  }
}
