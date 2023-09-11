import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import chatReducer from './features/chatSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
})