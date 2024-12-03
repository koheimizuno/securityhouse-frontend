/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { storeInitialType } from '@/types/storeInitialType'
import { PostType } from '@/types/postType'

export const createPostAction: any = createAsyncThunk('createPostAction', async (payload: PostType, thunkApi) => {
  try {
    await axios.post(`/api/post/`, payload)
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data)
  }
})

export const editPostAction: any = createAsyncThunk('editPostAction', async (payload: PostType, thunkApi) => {
  try {
    await axios.put(`/api/post/`, payload)
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data)
  }
})

export const deletePostAction: any = createAsyncThunk('deletePostAction', async (id: string, thunkApi) => {
  try {
    await axios.delete(`/api/post/`, { params: { id } })
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data)
  }
})

export const postReportAction: any = createAsyncThunk('postReportAction', async (id: string, thunkApi) => {
  try {
    await axios.post(`/api/report/`, { params: { id } })
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data)
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
      .addCase(createPostAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(editPostAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('投稿が正常に変更されました。')
      })
      .addCase(editPostAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(deletePostAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('投稿が正常に削除されました。')
      })
      .addCase(deletePostAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(postReportAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('通報に成功しました。')
      })
      .addCase(postReportAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
  }
})

export const { reducer } = postSlice
export default postSlice
