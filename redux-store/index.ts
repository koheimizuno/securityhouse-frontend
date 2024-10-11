// Third-party Imports
import { configureStore } from '@reduxjs/toolkit'

// Slice Imports
import analysisDataReducer from './slices/dataSlice'

export const store = configureStore({
  reducer: {
    analysisDataReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
