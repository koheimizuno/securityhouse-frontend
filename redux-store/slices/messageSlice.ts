/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { MessageType } from '@/types/messageType'
import { storeInitialType } from '@/types/storeInitialType'

export const deleteMessageAction: any = createAsyncThunk('deleteMessageAction', async (id: string) => {
  try {
    await axios.delete(`/api/message/`, { params: { id: id } })
  } catch (err) {
    return err
  }
})

const initialState: storeInitialType = {
  success: false,
  error: false,
  isLoading: false
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteMessageAction.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteMessageAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('メッセージが成果的に削除されました。')
      })
      .addCase(deleteMessageAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
  }
})

export const { reducer } = messageSlice
export default messageSlice
