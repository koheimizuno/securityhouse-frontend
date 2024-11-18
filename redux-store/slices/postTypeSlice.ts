/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PostType_Type } from '@/types/postType'
import { storeInitialType } from '@/types/storeInitialType'

export const createPostTypeAction: any = createAsyncThunk('createPostTypeAction', async (payload: PostType_Type) => {
  try {
    await axios.post(`/api/post_type/`, payload)
  } catch (err: any) {
    return err.response.data
  }
})

export const getPostTypeAction: any = createAsyncThunk('getPostTypeAction', async () => {
  try {
    const res = await axios.get(`/api/post_type/`)
    return res.data
  } catch (err: any) {
    return err.response.data
  }
})

export const editPostTypeAction: any = createAsyncThunk('editPostTypeAction', async (payload: PostType_Type) => {
  try {
    await axios.put(`/api/post_type/`, payload)
  } catch (err: any) {
    return err.response.data
  }
})

export const deletePostTypeAction: any = createAsyncThunk('deletePostTypeAction', async () => {
  try {
    await axios.delete(`/api/post_type/`)
  } catch (err: any) {
    return err.response.data
  }
})

interface initialStateTypes extends storeInitialType {
  postTypes: PostType_Type[]
}

const initialState: initialStateTypes = {
  postTypes: [],
  success: false,
  error: false,
  isLoading: false
}

export const postTypeSlice = createSlice({
  name: 'postType',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPostTypeAction.pending, state => {
        state.isLoading = true
      })
      .addCase(getPostTypeAction.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.success = true
        state.postTypes = payload.type
      })
      .addCase(getPostTypeAction.rejected, state => {
        state.isLoading = false
        state.error = true
      })
      .addCase(createPostTypeAction.pending, state => {
        state.isLoading = true
      })
      .addCase(createPostTypeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('投稿タイプが正常に作成されました。')
      })
      .addCase(createPostTypeAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(editPostTypeAction.pending, state => {
        state.isLoading = true
      })
      .addCase(editPostTypeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('投稿タイプが正常に変更されました。')
      })
      .addCase(editPostTypeAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(deletePostTypeAction.pending, state => {
        state.isLoading = true
      })
      .addCase(deletePostTypeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('投稿タイプが正常に削除されました。')
      })
      .addCase(deletePostTypeAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
  }
})

export const { reducer } = postTypeSlice
export default postTypeSlice
