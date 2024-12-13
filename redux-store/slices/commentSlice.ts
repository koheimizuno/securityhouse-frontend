/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { storeInitialType } from '@/types/storeInitialType'
import { CommentType } from '@/types/commentType'

export const editCommentAction: any = createAsyncThunk('editCommentAction', async (payload: CommentType, thunkApi) => {
  try {
    await axios.put(`/api/comment/`, payload)
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data)
  }
})

export const deleteCommentAction: any = createAsyncThunk('deleteCommentAction', async (id: string, thunkApi) => {
  try {
    await axios.delete(`/api/comment/`, { params: { id } })
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data)
  }
})

export const commentLikeAction: any = createAsyncThunk('commentLikeAction', async (id: string, thunkApi) => {
  try {
    await axios.post(`/api/comment/like/${id}`)
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data)
  }
})

export const deleteCommentLikeAction: any = createAsyncThunk(
  'deleteCommentLikeAction',
  async (id: string, thunkApi) => {
    try {
      await axios.delete(`/api/comment/like/${id}`)
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data)
    }
  }
)

export const commentHideAction: any = createAsyncThunk(
  'commentHideAction',
  async ({ id }: { id: string }, thunkApi) => {
    try {
      await axios.post(`/api/comment/hide/`, { id })
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data)
    }
  }
)

const initialState: storeInitialType = {
  success: false,
  error: false,
  isLoading: false
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(editCommentAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('コメントが正常に変更されました。')
      })
      .addCase(editCommentAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(deleteCommentAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('コメントが正常に削除されました。')
      })
      .addCase(deleteCommentAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(commentLikeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('コメントに「いいね！」を追加しました。')
      })
      .addCase(commentLikeAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(deleteCommentLikeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('コメントから「いいね」を削除しました。')
      })
      .addCase(deleteCommentLikeAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(commentHideAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('コメントが正常に隠しました。')
      })
      .addCase(commentHideAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
  }
})

export const { reducer } = commentSlice
export default commentSlice
