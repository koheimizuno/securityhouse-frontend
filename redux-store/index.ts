import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authSlice from './slices/authSlice'
import postSlice from './slices/postSlice'
import postTypeSlice from './slices/postTypeSlice'
import categorySlice from './slices/categorySlice'
import groupSlice from './slices/groupSlice'
import commentSlice from './slices/commentSlice'
import messageSlice from './slices/messageSlice'
import badgeSlice from './slices/badgeSlice'
import challengeSlice from './slices/challengeSlice'
import rankingSlice from './slices/rankingSlice'
import newsSlice from './slices/newsSlice'

const rootReducer = combineReducers({
  user: authSlice.reducer,
  post: postSlice.reducer,
  post_type: postTypeSlice.reducer,
  category: categorySlice.reducer,
  group: groupSlice.reducer,
  comment: commentSlice.reducer,
  message: messageSlice.reducer,
  news: newsSlice.reducer,
  badge: badgeSlice.reducer,
  challenge: challengeSlice.reducer,
  ranking: rankingSlice.reducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>

export default store
