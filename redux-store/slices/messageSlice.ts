import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { MessageType } from '@/types/messageType'
import { storeInitialType } from '@/types/storeInitialType'

export const createMessageAction: any = createAsyncThunk(
  'createMessageAction',
  async (payload: Omit<MessageType, 'id' | 'sender'>) => {
    try {
      await axios.post(`/api/message/`, payload)
    } catch (err) {
      return err
    }
  }
)

export const editMessageAction: any = createAsyncThunk(
  'editMessageAction',
  async (payload: Omit<MessageType, 'sender' | 'receiver'>) => {
    try {
      await axios.put(`/api/message/`, payload)
    } catch (err) {
      return err
    }
  }
)

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
      .addCase(createMessageAction.pending, state => {
        state.isLoading = true
      })
      .addCase(createMessageAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('メッセージが成果的に送信されました。')
      })
      .addCase(createMessageAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(editMessageAction.pending, state => {
        state.isLoading = true
      })
      .addCase(editMessageAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('メッセージが成果的に変更されました。')
      })
      .addCase(editMessageAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
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
