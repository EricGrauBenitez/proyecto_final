import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentChat: null,
  conversation: [],
  chats: []
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChat: (state, { payload }) => {
        state.currentChat = payload
    },
    setConversation: (state, { payload }) => {
        state.conversation = payload
    },
    setChats: (state, { payload }) => {
      state.chats = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentChat, setConversation, setChats } = chatSlice.actions

export default chatSlice.reducer