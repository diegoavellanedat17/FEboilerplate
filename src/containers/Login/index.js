/* eslint-disable */
import './Login.css'
import { Form, Container, Button, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { loginRequest } from '../../slices'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [emailValue, setEmailValue] = React.useState('')
  const [passwordValue, setPasswordValue] = React.useState('')

  const onLogin = async () => {
    // eslint-disable-next-line
    console.log('email:', emailValue)
    // eslint-disable-next-line
    console.log('password:', passwordValue)
    const firebaseUser = await signInWithEmailAndPassword(auth, emailValue, passwordValue)
    console.log(firebaseUser)
    // dispatch(loginRequest({ email: emailValue, password: passwordValue }))
    navigate('/user', { replace: true })
  }

  return (
    <Container className="mt-3 w-70">
      <Row className="justify-content-center">
        <Col xs={8} md={6}>
          <Form className="p-3 align-self-center">
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
            <Button variant="primary" onClick={onLogin}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
