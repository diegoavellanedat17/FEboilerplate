import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Spinner } from 'react-bootstrap'
import { signOut } from 'firebase/auth'
import Header from '../../components/Header'
import { auth } from '../../firebase'

const UserDashboard = () => {
  const user = useSelector((state) => state.authSlice.user)
  const loading = useSelector((state) => state.authSlice.loadingUser)

  const onLogout = async () => {
    await signOut(auth)
  }

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  return (
    <>
      <Header />
      <h1>{user.email}</h1>
      <Button onClick={onLogout}> Logout</Button>
    </>
  )
}

export default UserDashboard
