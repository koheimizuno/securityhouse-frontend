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

export const getPostByIdAction = async ({ user_id, id }: { user_id: string; id: string }) => {
  try {
    const { data } = await axios.get(`/api/post/${id}`, {
      params: {
        user_id
      }
    })
    return data
  } catch (err) {
    console.error(err)
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
    console.error(err)
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
    console.error(err)
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
    console.error(err)
    throw err
  }
}

export const getMypageBmarkPostListAction = async ({ user_id }: { user_id: number }) => {
  try {
    const { data } = await axios.get(`/api/mypageBmarkPostList`, {
      params: {
        user_id
      }
    })
    return data.posts
  } catch (err) {
    console.error(err)
    throw err
  }
}
