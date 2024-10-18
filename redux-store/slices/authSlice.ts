import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { UsersType } from '@/types/userType'
import { storeInitialType } from '@/types/storeInitialType'

export const registerAction: any = createAsyncThunk(
  'registerAction',
  async (payload: Pick<UsersType, 'uid' | 'email' | 'password' | 'role_id' | 'group_id'>) => {
    try {
      return await axios.post(`/api/user/`, payload)
    } catch (err: any) {
      console.error('Error registering user:', err)
    }
  }
)

export const loginAction: any = createAsyncThunk(
  'loginAction',
  async (payload: Pick<UsersType, 'email' | 'password'>) => {
    try {
      return await axios.post(`/api/login/`, payload)
    } catch (err: any) {
      console.error('Error logining user:', err)
    }
  }
)

export const editUserAction: any = createAsyncThunk('editUserAction', async (payload: any) => {
  try {
    return await axios.put(`/api/user/`, payload)
  } catch (err: any) {
    console.error('Error editting user:', err)
  }
})

const initialState: storeInitialType = {
  success: false,
  error: false,
  isLoading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerAction.pending, state => {
        state.isLoading = true
      })
      .addCase(registerAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('ユーザー登録に成功しました。')
      })
      .addCase(registerAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(loginAction.pending, state => {
        state.isLoading = true
      })
      .addCase(loginAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('ログインに成功しました。')
      })
      .addCase(loginAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(editUserAction.pending, state => {
        state.isLoading = true
      })
      .addCase(editUserAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('ユーザー情報の変更に成功しました。')
      })
      .addCase(editUserAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
  }
})

export const { reducer } = authSlice
export default authSlice
