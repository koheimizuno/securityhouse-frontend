import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authSlice from '@/redux-store/slices/authSlice'
import postSlice from '@/redux-store/slices/postSlice'
import postTypeSlice from '@/redux-store/slices/postTypeSlice'
import categorySlice from '@/redux-store/slices/categorySlice'
import groupSlice from '@/redux-store/slices/groupSlice'
import commentSlice from '@/redux-store/slices/commentSlice'
import documentSlice from '@/redux-store/slices/documentSlice'
import messageSlice from '@/redux-store/slices/messageSlice'
import newsSlice from '@/redux-store/slices/newsSlice'

const rootReducer = combineReducers({
  user: authSlice.reducer,
  post: postSlice.reducer,
  post_type: postTypeSlice.reducer,
  category: categorySlice.reducer,
  group: groupSlice.reducer,
  comment: commentSlice.reducer,
  document: documentSlice.reducer,
  message: messageSlice.reducer,
  news: newsSlice.reducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof rootReducer>

export default store
