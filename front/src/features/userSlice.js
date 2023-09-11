import { createSlice } from '@reduxjs/toolkit'
import { Api } from '../services'

const API = new Api(); 

const initialState = {
  userData: null,
  isLoggedIn: false,
  currentChat: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: async (state, { payload }) => {
      try {
        const { email, password } = payload;

        const { data } = await API.post('/login', { email, password });

        const token = data.token;

        localStorage.setItem('token', token);

        state.isLoggedIn = true;

      } catch (error) {
        console.error('Error al iniciar sesión', error);
      }
    },
    logout: (state) => {
      localStorage.clear()
        return {
            // window.location.reload()
            ...state,
            isLoggedIn: false,
            userData: null,
            
        // } catch (error) {
        //     console.error(error);
        //   }
    }},
    register: () => {}
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, register } = userSlice.actions

export default userSlice.reducer