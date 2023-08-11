import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
})