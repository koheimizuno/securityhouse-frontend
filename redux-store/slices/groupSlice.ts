/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { GroupType } from '@/types/groupType'
import { storeInitialType } from '@/types/storeInitialType'

export const createGroupAction: any = createAsyncThunk('createGroupAction', async (payload: GroupType) => {
  try {
    await axios.post(`/api/group/`, payload)
  } catch (err: any) {
    return err.response.data
  }
})

export const getGroupAction: any = createAsyncThunk('getGroupAction', async () => {
  try {
    const res = await axios.get(`/api/group/`)
    return res.data
  } catch (err: any) {
    return err.response.data
  }
})

export const editGroupAction: any = createAsyncThunk('editGroupAction', async (payload: GroupType) => {
  try {
    await axios.put(`/api/group/`, payload)
  } catch (err: any) {
    return err.response.data
  }
})

export const deleteGroupAction: any = createAsyncThunk('deleteGroupAction', async (id: string) => {
  try {
    await axios.delete(`/api/group/`, { params: { id: id } })
  } catch (err: any) {
    return err.response.data
  }
})

interface initialStateTypes extends storeInitialType {
  groups: GroupType[]
}

const initialState: initialStateTypes = {
  groups: [],
  success: false,
  error: false,
  isLoading: false
}

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getGroupAction.pending, state => {
        state.isLoading = true
      })
      .addCase(getGroupAction.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.success = true
        state.groups = payload.groups
      })
      .addCase(getGroupAction.rejected, state => {
        state.isLoading = false
        state.error = true
      })
      .addCase(createGroupAction.pending, state => {
        state.isLoading = true
      })
      .addCase(createGroupAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('グループが正常に作成されました。')
      })
      .addCase(createGroupAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(editGroupAction.pending, state => {
        state.isLoading = true
      })
      .addCase(editGroupAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('グループが正常に変更されました。')
      })
      .addCase(editGroupAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
      .addCase(deleteGroupAction.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteGroupAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('グループが正常に削除されました。')
      })
      .addCase(deleteGroupAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = true
        toast.error(payload.message)
      })
  }
})

export const { reducer } = groupSlice
export default groupSlice
