/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { storeInitialType } from '@/types/storeInitialType'
import { PostType } from '@/types/postType'

export const createPostAction: any = createAsyncThunk('createPostAction', async (payload: PostType) => {
  try {
    await axios.post(`/api/post/`, payload)
  } catch (err) {
    return err
  }
})

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

export const postBookmarkAction: any = createAsyncThunk(
  'postBookmarkAction',
  async ({ post_id, user_id }: { post_id: string; user_id: string }) => {
    try {
      await axios.post(`/api/post/bookmark/`, {
        params: {
          post_id: post_id,
          user_id: user_id
        }
      })
    } catch (err) {
      return err
    }
  }
)

export const deletePostBookmarkAction: any = createAsyncThunk(
  'deletePostBookmarkAction',
  async ({ post_id, user_id }: { post_id: string; user_id: string }) => {
    try {
      await axios.delete(`/api/post/bookmark/`, {
        params: {
          post_id: post_id,
          user_id: user_id
        }
      })
    } catch (err) {
      return err
    }
  }
)

export const postReportAction: any = createAsyncThunk('postReportAction', async (id: string) => {
  try {
    await axios.post(`/api/report/`, { id })
  } catch (err) {
    return err
  }
})

const initialState: storeInitialType = {
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
        toast.success('投稿に「いいね！」を追加しました。')
      })
      .addCase(postLikeAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(deletePostLikeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('投稿から「いいね！」を削除しました。')
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
      .addCase(deletePostBookmarkAction.pending, state => {
        state.isLoading = true
        state.success = true
        toast.success('ブックマークから削除されました。')
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
      .addCase(postReportAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('通報に成功しました。')
      })
      .addCase(postReportAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
  }
})

export const { reducer } = postSlice
export default postSlice
