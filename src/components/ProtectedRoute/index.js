import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

// eslint-disable-next-line
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.authSlice.user)
  const loading = useSelector((state) => state.authSlice.loadingUser)
  if (loading) return <Spinner animation="grow" />
  if (Object.keys(user).length === 0) return <Navigate to="/login" />
  // eslint-disable-next-line
  return <>{children}</>
}

export default ProtectedRoute
