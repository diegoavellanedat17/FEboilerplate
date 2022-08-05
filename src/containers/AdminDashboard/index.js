import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, InputGroup, Form, Container, Row, Col } from 'react-bootstrap'
import { signOut } from 'firebase/auth'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { FaBeer, FaRegClock } from 'react-icons/fa'
import { userDevices, setInitialState } from '../../slices'
import Header from '../../components/Header'
import Devices from '../../components/Devices'
import { auth, db } from '../../firebase'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authSlice.user)
  const [documentState, setDocumentState] = React.useState(true)
  const [documentInfo, setDocumentInfo] = React.useState('')

  const onRemove = async () => {
    const datos = await getDocs(collection(db, 'devices'))
    datos.forEach(async (item) => {
      await deleteDoc(doc(db, 'devices', item.id))
    })
    dispatch(userDevices([]))
  }

  const onLogout = async () => {
    await signOut(auth)
    dispatch(setInitialState())
  }

  const onSaveFirebase = async () => {
    setDocumentState(false)
    if (!documentInfo) {
      throw new Error('dont save empty values')
    }
    const devices = collection(db, 'devices')
    try {
      await addDoc(devices, {
        name: documentInfo,
        status: 'inactive'
      })

      setDocumentState(true)
    } catch (error) {
      console.error('Error adding document: ', error)
      setDocumentState(false)
    }
  }

  return (
    <>
      <Header />

      <Container>
        <h2>{user.email}</h2>
        <Row>
          <Col xs="5" md="2">
            {' '}
            <Button onClick={onLogout}> Logout</Button>
          </Col>
          <Col xs="5" md="2">
            {' '}
            <Button onClick={onRemove}> Remove All Elements</Button>
          </Col>
          <Col xs="10" md="7">
            <InputGroup className="mb-3">
              <Button variant="outline-secondary" id="button-addon1" onClick={onSaveFirebase}>
                {documentState ? <FaBeer /> : <FaRegClock />}
                <span /> Save in DB
              </Button>
              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value={documentInfo}
                onChange={(event) => {
                  setDocumentInfo(event.target.value)
                }}
              />
            </InputGroup>
          </Col>
        </Row>
        <Devices />
      </Container>
    </>
  )
}

export default AdminDashboard
