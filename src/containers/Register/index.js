/* eslint-disable */
import './Login.css'
import { Form, Container, Button, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { registerRequest } from '../../slices'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth, db } from '../../firebase'

const Login = () => {
  const navigate = useNavigate()

  const [emailValue, setEmailValue] = React.useState('')
  const [nameValue, setNameValue] = React.useState('')
  const [passwordValue, setPasswordValue] = React.useState('')
  const [error, setError] = React.useState('')

  const onRegister = async () => {
    // eslint-disable-next-line
    console.log('email:', emailValue)
    // eslint-disable-next-line
    console.log('password:', passwordValue)
    try {
      await createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      //await sendEmailVerification(auth)
      // dispatch(registerRequest({ email: emailValue, password: passwordValue, name: nameValue }))
      const users = collection(db, 'users')
      try {
        await addDoc(users, {
          email: emailValue,
          role: 'user',
          uid: auth.currentUser.uid,
          devices: []
        })
      } catch (error) {
        console.error('Error adding document: ', error)
      }
      navigate('/user', { replace: true })
    } catch (error) {
      setError(error.message)
      console.log(error.message)
    }
  }

  return (
    <Container className="mt-3 w-70">
      {error && <p>{error}</p>}
      <Row className="justify-content-center">
        <Col xs={8} md={6}>
          <Form className="p-3 align-self-center">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={nameValue}
                onChange={(event) => {
                  setNameValue(event.target.value)
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={emailValue}
                onChange={(event) => {
                  setEmailValue(event.target.value)
                }}
              />
              <Form.Text className="text-muted">
                We&apos;ll never share your email with anyone else
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                value={passwordValue}
                onChange={(event) => {
                  setPasswordValue(event.target.value)
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckBox">
              <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>
            <Button variant="primary" onClick={onRegister}>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
