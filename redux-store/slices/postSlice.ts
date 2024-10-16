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
  }
})

export const { reducer } = postSlice
export default postSlice
