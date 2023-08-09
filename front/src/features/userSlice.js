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
  userData: null 
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: async (state, action) => {
      try {
        const { email, password } = action.payload;

        const { data } = await API.post('/login', { email, password });

        const token = data.token;
        localStorage.setItem('token', token);

        // No redirigir aquí
      } catch (error) {
        console.error('Error al iniciar sesión', error);
      }
    },
    async logout () {
        try {
            console.log('LOGOUT')
            localStorage.clear()
            window.location.reload()
        } catch (error) {
            console.error(error);
          }
    },
    register () {}
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, register } = userSlice.actions

export default userSlice.reducer