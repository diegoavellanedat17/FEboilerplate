/* eslint-disable */
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
  getDoc
} from 'firebase/firestore'
import { FcElectronics } from 'react-icons/fc'
import 'bootstrap/dist/css/bootstrap.min.css'
import { isUser } from '../../slices'
import { db } from '../../firebase'

const InputAddDevice = () => {
  const dispatch = useDispatch()
  const userDevicesAsociated = useSelector((state) => state.authSlice.user.devices)
  const user = useSelector((state) => state.authSlice.user)
  const [device, setDevice] = React.useState('')

  const SaveDevice = async () => {
    console.log('save device', device)
    const isDevice = await checkDevicesExistance(device)

    if (isDevice) {
      ;(async () => {
        let docId
        const userNewDevices = userDevicesAsociated.slice()
        userNewDevices.push(device)
        const userDocumentRef = query(collection(db, 'users'), where('uid', '==', user.uid))
        const querySnapshot = await getDocs(userDocumentRef)
        querySnapshot.forEach((doc) => {
          docId = doc.id
        })
        const userRef = doc(db, 'users', docId)
        await updateDoc(userRef, {
          devices: arrayUnion(device)
        })

        dispatch(isUser({ ...user, devices: userNewDevices }))
      })()
    } else {
      console.log('ese dispositivo no existe')
    }
  }

  const checkDevicesExistance = async (device) => {
    const deviceRef = doc(db, 'devices', device)

    const docSnap = await getDoc(deviceRef)

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      return true
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
      return false
    }
  }
  return (
    <InputGroup className="mb-3">
      <Form.Control
        aria-label="Example text with button addon"
        aria-describedby="basic-addon1"
        value={device}
        onChange={(event) => {
          setDevice(event.target.value)
        }}
      />
      <Button variant="outline-secondary" id="button-addon1" onClick={SaveDevice}>
        <FcElectronics />
        <span /> Add Device
      </Button>
    </InputGroup>
  )
}

export default InputAddDevice
