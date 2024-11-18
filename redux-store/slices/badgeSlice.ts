/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { storeInitialType } from '@/types/storeInitialType'
import { BadgeType } from '@/types/badgeType'

export const createBadgeAction: any = createAsyncThunk('createBadgeAction', async (payload: BadgeType) => {
  try {
    await axios.post(`/api/badge/`, payload)
  } catch (err: any) {
    return err.response.data
  }
})

export const editBadgeAction: any = createAsyncThunk('editBadgeAction', async (payload: BadgeType) => {
  try {
    await axios.put(`/api/badge/`, payload)
  } catch (err: any) {
    return err.response.data
  }
})

export const deleteBadgeAction: any = createAsyncThunk('deleteBadgeAction', async (id: string) => {
  try {
    await axios.delete(`/api/badge/`, { params: { id } })
  } catch (err: any) {
    return err.response.data
  }
})

export const acquireBadgeAction: any = createAsyncThunk(
  'acquireBadgeAction',
  async ({ badge_id }: { badge_id: string }) => {
    try {
      await axios.post(`/api/badge/acquire/`, { badge_id })
    } catch (err: any) {
      return err.response.data
    }
  }
)

const initialState: storeInitialType = {
  success: false,
  error: false,
  isLoading: false
}

export const badgeSlice = createSlice({
  name: 'badge',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createBadgeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('バッジが成果的に登録されました。')
      })
      .addCase(createBadgeAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(editBadgeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('バッジが成果的に変更されました。')
      })
      .addCase(editBadgeAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(deleteBadgeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('バッジが成果的に削除されました。')
      })
      .addCase(deleteBadgeAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(acquireBadgeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('バッジを成果的に獲得しました。')
      })
      .addCase(acquireBadgeAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
  }
})

export const { reducer } = badgeSlice
export default badgeSlice
