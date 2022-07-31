import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  loadingUser: true,
  devices: []
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    map: (state) => state,
    isUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
        // eslint-disable-next-line
        loadingUser: action.payload ? false : true
      }
    },
    userDevices: (state, action) => {
      console.log('se corre el dispatcher con ', action.payload)
      return {
        ...state,
        devices: action.payload
      }
    }
  }
})

// export const { map, loginRequest, registerRequest } = authSlice.actions
export const { map, isUser, userDevices } = authSlice.actions
export default authSlice.reducer
