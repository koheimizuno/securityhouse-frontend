/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { CategoryType } from '@/types/categoryType'
import { storeInitialType } from '@/types/storeInitialType'

export const getCategoryAction: any = createAsyncThunk(
  'getCategoryAction',
  async ({ pageFlag, type_id }: { pageFlag: string; type_id: string }, thunkApi) => {
    try {
      const res = await axios.get(`/api/category/`, {
        params: {
          pageFlag: pageFlag,
          type_id: type_id
        }
      })
      return res.data
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data)
    }
  }
)

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
  }
})

export const { reducer } = categorySlice
export default categorySlice
