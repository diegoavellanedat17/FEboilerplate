import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    map: (state) => state,
    loginRequest: (state, action) => {
      return { ...state, user: action.payload }
    }
  }
})

export const { map, loginRequest } = authSlice.actions
export default authSlice.reducer
