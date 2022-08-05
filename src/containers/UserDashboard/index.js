/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { useSelector } from 'react-redux'

import { Container, Button, Row, Col } from 'react-bootstrap'

import { signOut } from 'firebase/auth'
import Header from '../../components/Header'
import { auth } from '../../firebase'
import Devices from '../../components/UserDevices'
import InputAddDevice from '../../components/InputAddDevice'

const UserDashboard = () => {
  const onLogout = async () => {
    return await signOut(auth)
  }
  const user = useSelector((state) => state.authSlice.user)

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={10}>
            <h5>Usuario : {user.email}</h5>
          </Col>
          <Col md={2}>
            <Button onClick={onLogout}> Logout</Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={6}>
            <InputAddDevice />
          </Col>
          <Devices />
        </Row>
      </Container>
    </>
  )
}

export default UserDashboard
