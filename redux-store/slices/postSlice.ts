import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { PostType } from '@/types/postType'

export const createPostAction: any = createAsyncThunk(
  'createPostAction',
  async (payload: Omit<PostType, 'id' | 'user_id' | 'notification' | 'attachments'>) => {
    try {
      await axios.post(`/api/post/`, payload)
    } catch (err) {
      return err
    }
  }
)

export const editPostAction: any = createAsyncThunk('editPostAction', async (payload: PostType) => {
  try {
    await axios.put(`/api/post/`, payload)
  } catch (err) {
    return err
  }
})

export const deletePostAction: any = createAsyncThunk('deletePostAction', async (id: string) => {
  try {
    await axios.delete(`/api/post/`, { params: { id } })
  } catch (err) {
    return err
  }
})

export const postLikeAction: any = createAsyncThunk('postLikeAction', async (id: string) => {
  try {
    await axios.post(`/api/post/like/${id}`)
  } catch (err) {
    return err
  }
})

export const deletePostLikeAction: any = createAsyncThunk('deletePostLikeAction', async (id: string) => {
  try {
    await axios.delete(`/api/post/like/${id}`)
  } catch (err) {
    return err
  }
})

export const postBookmarkAction: any = createAsyncThunk('postBookmarkAction', async (id: string) => {
  try {
    await axios.post(`/api/post/bookmark/${id}`)
  } catch (err) {
    return err
  }
})

export const deletePostBookmarkAction: any = createAsyncThunk('deletePostBookmarkAction', async (id: string) => {
  try {
    await axios.delete(`/api/post/bookmark/${id}`)
  } catch (err) {
    return err
  }
})

const initialState: any = {
  success: false,
  error: false,
  isLoading: false
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createPostAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('投稿が正常に作成されました。')
      })
      .addCase(createPostAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(editPostAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('投稿が正常に変更されました。')
      })
      .addCase(editPostAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(deletePostAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('投稿が正常に削除されました。')
      })
      .addCase(deletePostAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(postLikeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('いいねを追加しました。')
      })
      .addCase(postLikeAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(deletePostLikeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('いいねを削除しました。')
      })
      .addCase(deletePostLikeAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(postBookmarkAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('ブックマークに追加されました。')
      })
      .addCase(postBookmarkAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(deletePostBookmarkAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('ブックマークから削除されました。')
      })
      .addCase(deletePostBookmarkAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
  }
})

export const { reducer } = postSlice
export default postSlice
