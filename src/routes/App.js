import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import Login from '../containers/Login'
import Register from '../containers/Register'
import NotFound from '../containers/NotFound'
import Landing from '../containers/Landing'
import ProtectedRoute from '../components/ProtectedRoute'
import { isUser } from '../slices'
import UserDashboard from '../containers/UserDashboard'
import { auth } from '../firebase'

const App = () => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      let user = {}
      if (currentUser)
        user = { email: currentUser.email, uid: currentUser.uid, name: currentUser.displayName }
      dispatch(isUser(user))
    })
  }, [])
  return (
    <Routes>
      <Route path="/" element={Landing()} />
      <Route path="/login" element={Login()} />
      <Route path="/register" element={Register()} />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={NotFound()} />
    </Routes>
  )
}
export default App
