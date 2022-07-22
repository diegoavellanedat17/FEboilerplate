import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './routes/App'
import authReducer from './slices'

const store = configureStore({ reducer: { authSlice: authReducer } })

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
