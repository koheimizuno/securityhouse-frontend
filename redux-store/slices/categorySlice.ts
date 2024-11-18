/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { CategoryType } from '@/types/categoryType'
import { storeInitialType } from '@/types/storeInitialType'

export const createCategoryAction: any = createAsyncThunk('createCategoryAction', async (payload: CategoryType) => {
  try {
    await axios.post(`/api/category/`, payload)
  } catch (err: any) {
    return err.response.data
  }
})

export const getCategoryAction: any = createAsyncThunk(
  'getCategoryAction',
  async ({ pageFlag, type_id }: { pageFlag: string; type_id: string }) => {
    try {
      const res = await axios.get(`/api/category/`, {
        params: {
          pageFlag: pageFlag,
          type_id: type_id
        }
      })
      return res.data
    } catch (err: any) {
      return err.response.data
    }
  }
)

export const editCategoryAction: any = createAsyncThunk('editCategoryAction', async (payload: CategoryType) => {
  try {
    await axios.put(`/api/category/`, payload)
  } catch (err: any) {
    return err.response.data
  }
})

export const deleteCategoryAction: any = createAsyncThunk('deleteCategoryAction', async (id: string) => {
  try {
    await axios.delete(`/api/category/`, { params: { id: id } })
  } catch (err: any) {
    return err.response.data
  }
})

interface initialStateTypes extends storeInitialType {
  categories: CategoryType[]
}

const initialState: initialStateTypes = {
  categories: [],
  success: false,
  error: false,
  isLoading: false
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategoryAction.pending, state => {
        state.isLoading = true
      })
      .addCase(getCategoryAction.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.success = true
        state.categories = payload.categories
      })
      .addCase(getCategoryAction.rejected, state => {
        state.isLoading = false
        state.error = true
      })
      .addCase(createCategoryAction.pending, state => {
        state.isLoading = true
      })
      .addCase(createCategoryAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('カテゴリーが正常に作成されました。')
      })
      .addCase(createCategoryAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(editCategoryAction.pending, state => {
        state.isLoading = true
      })
      .addCase(editCategoryAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('カテゴリーが正常に変更されました。')
      })
      .addCase(editCategoryAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(deleteCategoryAction.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteCategoryAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('カテゴリーが正常に削除されました。')
      })
      .addCase(deleteCategoryAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
  }
})

export const { reducer } = categorySlice
export default categorySlice
