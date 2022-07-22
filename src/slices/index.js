import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  loadingUser: true
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
    }
  }
})

// export const { map, loginRequest, registerRequest } = authSlice.actions
export const { map, isUser } = authSlice.actions
export default authSlice.reducer
