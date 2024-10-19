import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { storeInitialType } from '@/types/storeInitialType'
import { DocumentType } from '@/types/documentType'

export const createDocumentAction: any = createAsyncThunk(
  'createDocumentAction',
  async (payload: Omit<DocumentType, 'id'>) => {
    try {
      await axios.post(`/api/document/`, payload)
    } catch (err) {
      return err
    }
  }
)

export const editDocumentAction: any = createAsyncThunk('editDocumentAction', async (payload: DocumentType) => {
  try {
    await axios.put(`/api/document/`, payload)
  } catch (err) {
    return err
  }
})

export const deleteDocumentAction: any = createAsyncThunk('deleteDocumentAction', async (id: string) => {
  try {
    await axios.delete(`/api/document/`, { params: { id } })
  } catch (err) {
    return err
  }
})

const initialState: storeInitialType = {
  success: false,
  error: false,
  isLoading: false
}

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createDocumentAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('資料が正常に作成されました。')
      })
      .addCase(createDocumentAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(editDocumentAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('資料が正常に変更されました。')
      })
      .addCase(editDocumentAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(deleteDocumentAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('資料が正常に削除されました。')
      })
      .addCase(deleteDocumentAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
  }
})

export const { reducer } = documentSlice
export default documentSlice
