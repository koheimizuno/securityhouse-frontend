/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { storeInitialType } from '@/types/storeInitialType'
import { DocumentType } from '@/types/documentType'

export const createDocumentAction: any = createAsyncThunk('createDocumentAction', async (payload: DocumentType) => {
  try {
    await axios.post(`/api/document/`, payload)
  } catch (err: any) {
    return err.response.data
  }
})

export const editDocumentAction: any = createAsyncThunk('editDocumentAction', async (payload: DocumentType) => {
  try {
    await axios.put(`/api/document/`, payload)
  } catch (err: any) {
    return err.response.data
  }
})

export const deleteDocumentAction: any = createAsyncThunk('deleteDocumentAction', async (id: string) => {
  try {
    await axios.delete(`/api/document/`, { params: { id } })
  } catch (err: any) {
    return err.response.data
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
      .addCase(createDocumentAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(editDocumentAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('資料が正常に変更されました。')
      })
      .addCase(editDocumentAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(deleteDocumentAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('資料が正常に削除されました。')
      })
      .addCase(deleteDocumentAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
  }
})

export const { reducer } = documentSlice
export default documentSlice
