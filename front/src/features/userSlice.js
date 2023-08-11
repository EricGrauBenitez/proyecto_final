import { createSlice } from '@reduxjs/toolkit'
import { Api } from '../services'

const API = new Api(); 

/*

  userData = {
    email: "example@gmail.com",
    token: "smfksdnfksndfkskd",
    name: "asdasd"
    role: "asdasd"

*/

const initialState = {
  userData: null,
  isLoggedIn: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: async (state, { payload }) => {
      console.log('STATE 1', state.isloggedIn)
      try {
        const { email, password } = payload;

        const { data } = await API.post('/login', { email, password });

        /**
         * email: "example@gmail.com",
         * token: "smfksdnfksndfkskd",
         * name: "asdasd"
         * role: "asdasd"
         */

        const token = data.token;

        localStorage.setItem('token', token);

        state.isLoggedIn = true;

        console.log('STATE 2', state.isloggedIn)
      } catch (error) {
        console.error('Error al iniciar sesión', error);
      }
    },
    logout: async (state) => {
        try {
            console.log('LOGOUT')
            localStorage.clear()
            window.location.reload()
            state.isLoggedIn = false
        } catch (error) {
            console.error(error);
          }
    },
    register: () => {}
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, register } = userSlice.actions

export default userSlice.reducer