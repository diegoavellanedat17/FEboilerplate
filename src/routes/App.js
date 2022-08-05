/* eslint-disable */
import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { collection, query, where, getDocs } from 'firebase/firestore'
import Login from '../containers/Login'
import Register from '../containers/Register'
import NotFound from '../containers/NotFound'
import Landing from '../containers/Landing'
import ProtectedRoute from '../components/ProtectedRoute'
import { isUser, userDevices } from '../slices'
import AdminDashboard from '../containers/AdminDashboard'
import UserDashboard from '../containers/UserDashboard'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authSlice.user)
  React.useEffect(() => {
    const getUserData = async (currentUser) => {
      let role = 'none'
      let devices = []
      const userDocumentRef = query(collection(db, 'users'), where('uid', '==', currentUser.uid))
      const querySnapshot = await getDocs(userDocumentRef)
      querySnapshot.forEach((doc) => {
        role = doc.data().role
        devices = doc.data().devices
      })
      const user = {
        email: currentUser.email,
        uid: currentUser.uid,
        name: currentUser.displayName,
        role: role,
        devices: devices
      }

      dispatch(isUser(user))
      return navigate('/user', { replace: true })
    }
    onAuthStateChanged(auth, (currentUser) => {
      const user = {}
      const devices = []
      if (currentUser) {
        ;(async () => {
          await getUserData(currentUser)
        })()
      } else {
        dispatch(isUser(user))
        dispatch(userDevices([]))
      }
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
            {user.role === 'user' ? <UserDashboard /> : <AdminDashboard />}
          </ProtectedRoute>
        }
      />
      <Route path="*" element={NotFound()} />
    </Routes>
  )
}
export default App
