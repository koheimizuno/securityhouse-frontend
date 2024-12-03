/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PostType_Type } from '@/types/postType'
import { storeInitialType } from '@/types/storeInitialType'

export const getPostTypeAction: any = createAsyncThunk('getPostTypeAction', async (_, thunkApi) => {
  try {
    const res = await axios.get(`/api/post_type/`)
    return res.data
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data)
  }
})

interface initialStateTypes extends storeInitialType {
  postTypes: PostType_Type[]
}

const initialState: initialStateTypes = {
  postTypes: [],
  success: false,
  error: false,
  isLoading: false
}

export const postTypeSlice = createSlice({
  name: 'postType',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPostTypeAction.pending, state => {
        state.isLoading = true
      })
      .addCase(getPostTypeAction.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.success = true
        state.postTypes = payload.type
      })
      .addCase(getPostTypeAction.rejected, state => {
        state.isLoading = false
        state.error = true
      })
  }
})

export const { reducer } = postTypeSlice
export default postTypeSlice
