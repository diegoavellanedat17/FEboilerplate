import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import NotFound from '../containers/NotFound'

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={Login()} />
      <Route path="*" element={NotFound()} />
    </Routes>
  )
}
export default App
