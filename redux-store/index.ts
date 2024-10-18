import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authSlice from '@/redux-store/slices/authSlice'
import postSlice from '@/redux-store/slices/postSlice'
import postTypeSlice from '@/redux-store/slices/postTypeSlice'
import categorySlice from '@/redux-store/slices/categorySlice'

const rootReducer = combineReducers({
  user: authSlice.reducer,
  post: postSlice.reducer,
  post_type: postTypeSlice.reducer,
  category: categorySlice.reducer
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
