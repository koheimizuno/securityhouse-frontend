/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { storeInitialType } from '@/types/storeInitialType'
import { NewsType } from '@/types/newsType'

export const createNewsAction: any = createAsyncThunk('createNewsAction', async (payload: NewsType) => {
  try {
    await axios.post(`/api/news/`, payload)
  } catch (err: any) {
    return err.response.data
  }
})

export const editNewsAction: any = createAsyncThunk('editNewsAction', async (payload: NewsType) => {
  try {
    await axios.put(`/api/news/`, payload)
  } catch (err: any) {
    return err.response.data
  }
})

export const deleteNewsAction: any = createAsyncThunk('deleteNewsAction', async (id: string) => {
  try {
    await axios.delete(`/api/news/`, { params: { id } })
  } catch (err: any) {
    return err.response.data
  }
})

const initialState: storeInitialType = {
  success: false,
  error: false,
  isLoading: false
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createNewsAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('お知らせが成果として登録されました。')
      })
      .addCase(createNewsAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(editNewsAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('お知らせが成果的に変更されました。')
      })
      .addCase(editNewsAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(deleteNewsAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('お知らせが成果として削除されました。')
      })
      .addCase(deleteNewsAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
  }
})

export const { reducer } = newsSlice
export default newsSlice
