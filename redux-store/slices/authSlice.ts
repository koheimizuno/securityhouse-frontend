/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { UsersType } from '@/types/userType'
import { storeInitialType } from '@/types/storeInitialType'

export const registerAction: any = createAsyncThunk('registerAction', async (payload: UsersType) => {
  try {
    return await axios.post(`/api/user/`, payload)
  } catch (err: any) {
    console.error('Error registering user:', err)
  }
})

export const loginAction: any = createAsyncThunk(
  'loginAction',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data } = await axios.post(`/api/login/`, { email, password })
      return data
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

export const forgotPasswordAction: any = createAsyncThunk(
  'forgotPasswordAction',
  async ({ email }: { email: string }) => {
    try {
      return await axios.post(`/api/forgot-password/`, { email })
    } catch (err: any) {
      console.error('Error editting user:', err)
    }
  }
)

export const changePasswordAction: any = createAsyncThunk(
  'changePasswordAction',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      return await axios.patch(`/api/forgot-password/`, { email, password })
    } catch (err: any) {
      console.error('Error editting user:', err)
    }
  }
)

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
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.success = true
        if (payload.token) localStorage.setItem('token', JSON.stringify(payload.token))
        toast.success('ログインに成功しました。')
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
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
      .addCase(forgotPasswordAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
      })
      .addCase(forgotPasswordAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('メールアドレスが登録されていません。')
      })
      .addCase(changePasswordAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('パスワードが成果的に変更されました。')
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      })
      .addCase(changePasswordAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('メールアドレスが登録されていません。')
      })
  }
})

export const { reducer } = authSlice
export default authSlice
