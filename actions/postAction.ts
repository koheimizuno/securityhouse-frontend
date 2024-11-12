import axios from 'axios'
import toast from 'react-hot-toast'

export const getPostsAction = async ({
  user_id,
  type_id,
  category_id
}: {
  user_id?: string
  type_id?: string
  category_id?: string
}) => {
  try {
    const { data } = await axios.get('/api/posts/', {
      params: { user_id, type_id, category_id }
    })
    return data.posts
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}

export const getPostByIdAction = async ({ user_id, id }: { user_id: string; id: string }) => {
  try {
    const { data } = await axios.get(`/api/post/${id}`, {
      params: {
        user_id
      }
    })
    return data
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}

export const postBookmarkAction = async ({ post_id, user_id }: { post_id: number; user_id: string }) => {
  try {
    const { data } = await axios.post(`/api/post/bookmark/`, {
      params: {
        post_id,
        user_id
      }
    })
    toast.success('ブックマークに追加されました。')
    return data.bookmarks_flag
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}

export const deletePostBookmarkAction = async ({ post_id, user_id }: { post_id: number; user_id: string }) => {
  try {
    const { data } = await axios.delete(`/api/post/bookmark/`, {
      params: {
        post_id,
        user_id
      }
    })
    toast.success('ブックマークから削除されました。')
    return data.bookmarks_flag
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}

export const postLikeAction = async ({ id, user_id }: { id: number; user_id: string }) => {
  try {
    const { data } = await axios.post(`/api/post/like/`, { id, user_id })
    toast.success('投稿に「いいね！」を追加しました。')
    return data
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}

export const deletePostLikeAction = async ({ id, user_id }: { id: number; user_id: string }) => {
  try {
    const { data } = await axios.delete(`/api/post/like/`, {
      params: {
        id,
        user_id
      }
    })
    toast.success('投稿から「いいね！」を削除しました。')
    return data
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}

export const getBmarkPostListAction = async ({ user_id }: { user_id: number }) => {
  try {
    const { data } = await axios.post(`/api/post/bookmarkList`, { user_id })
    return data.bookmark_posts
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}

export const getMypagePostListAction = async ({ user_id }: { user_id: number }) => {
  try {
    const { data } = await axios.get(`/api/mypagePostList`, {
      params: {
        user_id
      }
    })
    return data.posts
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}

export const getMypageCommentPostListAction = async ({ user_id }: { user_id: number }) => {
  try {
    const { data } = await axios.get(`/api/mypageCommentPostList`, {
      params: {
        user_id
      }
    })
    return data.posts
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}

export const getMypageLikePostListAction = async ({ user_id }: { user_id: number }) => {
  try {
    const { data } = await axios.get(`/api/mypageLikePostList`, {
      params: {
        user_id
      }
    })
    return data.posts
  } catch (err) {
    toast.error('サーバの問題でデータ取得に失敗しました。')
    throw err
  }
}
