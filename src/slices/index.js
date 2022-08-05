import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  loadingUser: true,
  devices: [],
  subscriptions: []
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
      return {
        ...state,
        devices: action.payload
      }
    },
    setInitialState: (state) => {
      return {
        ...state,
        loadingUser: true,
        devices: []
      }
    }
  }
})

// export const { map, loginRequest, registerRequest } = authSlice.actions
export const { map, isUser, userDevices, setInitialState } = authSlice.actions
export default authSlice.reducer
