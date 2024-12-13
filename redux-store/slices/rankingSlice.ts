/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RankingType } from '@/types/rankingType'
import { storeInitialType } from '@/types/storeInitialType'

export const createRankingAction: any = createAsyncThunk(
  'createRankingAction',
  async (payload: RankingType, thunkApi) => {
    try {
      await axios.post(`/api/ranking/`, payload)
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data)
    }
  }
)

export const editRankingAction: any = createAsyncThunk('editRankingAction', async (payload: RankingType, thunkApi) => {
  try {
    await axios.put(`/api/ranking/`, payload)
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data)
  }
})

export const deleteRankingAction: any = createAsyncThunk('deleteRankingAction', async (id: string, thunkApi) => {
  try {
    await axios.delete(`/api/ranking/`, { params: { id: id } })
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data)
  }
})

const initialState: storeInitialType = {
  success: false,
  error: false,
  isLoading: false
}

export const rankingSlice = createSlice({
  name: 'ranking',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createRankingAction.pending, state => {
        state.isLoading = true
      })
      .addCase(createRankingAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('ランキングが正常に登録されました。')
      })
      .addCase(createRankingAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(editRankingAction.pending, state => {
        state.isLoading = true
      })
      .addCase(editRankingAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('ランキングが正常に変更されました。')
      })
      .addCase(editRankingAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(deleteRankingAction.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteRankingAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('ランキングが正常に削除されました。')
      })
      .addCase(deleteRankingAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
  }
})

export const { reducer } = rankingSlice
export default rankingSlice
