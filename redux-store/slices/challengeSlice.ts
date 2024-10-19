import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { storeInitialType } from '@/types/storeInitialType'
import { ChallengeType } from '@/types/challengeType'

export const createChallengeAction: any = createAsyncThunk(
  'createChallengeAction',
  async (payload: Omit<ChallengeType, 'id'>) => {
    try {
      await axios.post(`/api/challenge/`, payload)
    } catch (err) {
      return err
    }
  }
)

export const editChallengeAction: any = createAsyncThunk('editChallengeAction', async (payload: ChallengeType) => {
  try {
    await axios.put(`/api/challenge/`, payload)
  } catch (err) {
    return err
  }
})

export const deleteChallengeAction: any = createAsyncThunk('deleteChallengeAction', async (id: string) => {
  try {
    await axios.delete(`/api/challenge/`, { params: { id } })
  } catch (err) {
    return err
  }
})

export const completeChallengeAction: any = createAsyncThunk(
  'completeChallengeAction',
  async ({ challenge_id }: { challenge_id: string }) => {
    try {
      await axios.post(`/api/challenge/complete/`, { challenge_id })
    } catch (err) {
      return err
    }
  }
)

const initialState: storeInitialType = {
  success: false,
  error: false,
  isLoading: false
}

export const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createChallengeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('チャレンジが成果的に登録されました。')
      })
      .addCase(createChallengeAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(editChallengeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('チャレンジが成果的に変更されました。')
      })
      .addCase(editChallengeAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(deleteChallengeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('チャレンジが成果的に削除されました。')
      })
      .addCase(deleteChallengeAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(completeChallengeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('チャレンジが成果的に完了しました。')
      })
      .addCase(completeChallengeAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
  }
})

export const { reducer } = challengeSlice
export default challengeSlice
