import axios from 'axios'
import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { storeInitialType } from '@/types/storeInitialType'
import { CommentType } from '@/types/commentType'

export const createCommentAction: any = createAsyncThunk(
  'createCommentAction',
  async (payload: Pick<CommentType, 'content' | 'post_id' | 'attachment' | 'comment_id'>) => {
    try {
      await axios.post(`/api/comment/`, payload)
    } catch (err) {
      return err
    }
  }
)

export const editCommentAction: any = createAsyncThunk('editCommentAction', async (payload: CommentType) => {
  try {
    await axios.put(`/api/comment/`, payload)
  } catch (err) {
    return err
  }
})

export const deleteCommentAction: any = createAsyncThunk('deleteCommentAction', async (id: string) => {
  try {
    await axios.delete(`/api/comment/`, { params: { id } })
  } catch (err) {
    return err
  }
})

export const commentLikeAction: any = createAsyncThunk('commentLikeAction', async (id: string) => {
  try {
    await axios.post(`/api/comment/like/${id}`)
  } catch (err) {
    return err
  }
})

export const deleteCommentLikeAction: any = createAsyncThunk('deleteCommentLikeAction', async (id: string) => {
  try {
    await axios.delete(`/api/comment/like/${id}`)
  } catch (err) {
    return err
  }
})

export const commentHideAction: any = createAsyncThunk('commentHideAction', async ({ id }: { id: string }) => {
  try {
    await axios.post(`/api/comment/hide/`, { id })
  } catch (err) {
    return err
  }
})

const initialState: storeInitialType = {
  success: false,
  error: false,
  isLoading: false
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createCommentAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('コメントが正常に作成されました。')
      })
      .addCase(createCommentAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(editCommentAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('コメントが正常に変更されました。')
      })
      .addCase(editCommentAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(deleteCommentAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('コメントが正常に削除されました。')
      })
      .addCase(deleteCommentAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(commentLikeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('コメントに「いいね！」を追加しました。')
      })
      .addCase(commentLikeAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(deleteCommentLikeAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('コメントから「いいね」を削除しました。')
      })
      .addCase(deleteCommentLikeAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
      .addCase(commentHideAction.fulfilled, state => {
        state.isLoading = false
        state.success = true
        toast.success('Success')
      })
      .addCase(commentHideAction.rejected, state => {
        state.isLoading = false
        state.error = true
        toast.error('サーバの問題でデータ取得に失敗しました。')
      })
  }
})

export const { reducer } = commentSlice
export default commentSlice
