/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { UsersType } from '@/types/userType'
import { storeInitialType } from '@/types/storeInitialType'

export const registerAction: any = createAsyncThunk('registerAction', async (payload: UsersType, thunkApi) => {
  try {
    return await axios.post(`/api/user/`, payload)
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data)
  }
})

export const loginAction: any = createAsyncThunk(
  'loginAction',
  async ({ email, password }: { email: string; password: string }, thunkApi) => {
    try {
      const { data } = await axios.post(`/api/login/`, { email, password })
      return data
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data)
    }
  }
)

export const editUserAction: any = createAsyncThunk('editUserAction', async (payload: any, thunkApi) => {
  try {
    return await axios.put(`/api/user/`, payload)
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data)
  }
})

export const deleteUserAction: any = createAsyncThunk('deleteUserAction', async (id: number, thunkApi) => {
  try {
    return await axios.delete(`/api/user/`, {
      params: {
        id
      }
    })
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data)
  }
})

export const forgotPasswordAction: any = createAsyncThunk(
  'forgotPasswordAction',
  async ({ email }: { email: string }, thunkApi) => {
    try {
      const { data } = await axios.post(`/api/forgot-password/`, { email })
      return data
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data)
    }
  }
)

export const changePasswordAction: any = createAsyncThunk(
  'changePasswordAction',
  async ({ id, password }: { id: number; password: string }, thunkApi) => {
    try {
      return await axios.patch(`/api/forgot-password/`, { id, password })
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data)
    }
  }
)

interface AuthTypes extends storeInitialType {
  user_id: number | null
}

const initialState: AuthTypes = {
  user_id: null,
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
      .addCase(registerAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(loginAction.pending, state => {
        state.isLoading = true
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.success = true
        if (payload.token) localStorage.setItem('auth', JSON.stringify(payload))
        toast.success('ログインに成功しました。')
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
      })
      .addCase(loginAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(editUserAction.pending, state => {
        state.isLoading = true
      })
      .addCase(editUserAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('ユーザー情報の変更に成功しました。')
      })
      .addCase(editUserAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(deleteUserAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('ユーザー情報の削除に成功しました。')
      })
      .addCase(deleteUserAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(forgotPasswordAction.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.success = true
        state.user_id = payload.user_id
      })
      .addCase(forgotPasswordAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(changePasswordAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('パスワードが成果的に変更されました。')
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      })
      .addCase(changePasswordAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
  }
})

export const { reducer } = authSlice
export default authSlice
