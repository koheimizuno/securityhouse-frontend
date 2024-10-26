import axios from 'axios'

export const getPostsAction = async ({ type_id }: { type_id: string }) => {
  try {
    const { data } = await axios.get('/api/posts/', {
      params: { type_id }
    })
    return data.posts
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getPostByIdAction = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/post/${id}`)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getBookmarkedPostAction = async ({ post_id, user_id }: { post_id: string; user_id: string }) => {
  try {
    const { data } = await axios.post(`/api/post/bookmarkList`, { post_id, user_id })
    return data.bookmark_post
  } catch (err) {
    console.error(err)
    throw err
  }
}
