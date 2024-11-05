import axios from 'axios'

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

export const getMypagePostListAction = async () => {
  try {
    const { data } = await axios.get(`/api/mypagePostList`)
    return data.posts
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getMypageCommentPostListAction = async () => {
  try {
    const { data } = await axios.get(`/api/mypageCommentPostList`)
    return data.posts
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getMypageLikePostListAction = async () => {
  try {
    const { data } = await axios.get(`/api/mypageLikePostList`)
    return data.posts
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getMypageBmarkPostListAction = async () => {
  try {
    const { data } = await axios.post(`/api/mypageBmarkPostList`)
    return data.posts
  } catch (err) {
    console.error(err)
    throw err
  }
}
