/* eslint-disable */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { doc, getDoc, collection, query, onSnapshot, where, getDocs } from 'firebase/firestore'
import { userDevices, isUser } from '../../slices'
import Device from '../Device'
import { db } from '../../firebase'

const Devices = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authSlice.user)
  const userDevicesAsociated = useSelector((state) => state.authSlice.user.devices)
  const devicesDetail = useSelector((state) => state.authSlice.devices)
  const [changes, setChanges] = React.useState(null)
  const [deviceChanges, setDeviceChanges] = React.useState(null)

  useEffect(() => {
    ;(async () => {
      const devices = await Promise.all(
        userDevicesAsociated.map(async (id) => {
          const deviceDocRef = doc(db, 'devices', id)
          const docSnap = await getDoc(deviceDocRef)
          return { ...docSnap.data(), id: docSnap.id }
        })
      )

      dispatch(userDevices(devices))
    })()
  }, [userDevicesAsociated])

  useEffect(() => {
    const userChangesQuery = query(collection(db, 'users'), where('uid', '==', user.uid))
    onSnapshot(userChangesQuery, (querySnapshot) => {
      setChanges(true)
    })
  }, [])

  useEffect(() => {
    const getUserData = async (currentUser) => {
      let role = 'none'
      let devices = []
      const userDocumentRef = query(collection(db, 'users'), where('uid', '==', currentUser.uid))
      const querySnapshot = await getDocs(userDocumentRef)
      querySnapshot.forEach((doc) => {
        role = doc.data().role
        devices = doc.data().devices
      })
      const userInfo = {
        email: currentUser.email,
        uid: currentUser.uid,
        name: currentUser.displayName,
        role: role,
        devices: devices
      }
      dispatch(isUser(userInfo))
    }
    if (changes) {
      ;(async () => {
        await getUserData(user)
      })()
    }

    setChanges(false)
  }, [changes])

  useEffect(() => {
    let update = false

    const updatedDevices = devicesDetail.map((obj) => {
      if (obj.id === deviceChanges?.id) {
        update = true
        return { ...obj, ...deviceChanges }
      }
      return obj
    })

    dispatch(userDevices(updatedDevices))
  }, [deviceChanges])

  useEffect(() => {
    userDevicesAsociated.map((device) => {
      onSnapshot(doc(db, 'devices', device), (doc) => {
        setDeviceChanges({ ...doc.data(), id: doc.id })
      })
    })
  }, [userDevicesAsociated])

  return (
    <>
      <h2 className="mt-3">My Devices: </h2>
      <Row>
        {userDevicesAsociated.length === 0 ? (
          <h1>This user doesn't have devices yet</h1>
        ) : (
          devicesDetail.map((device) => (
            <Col xs={6} md={3} key={device.id}>
              <Device name={device.name} status={device.status} />
            </Col>
          ))
        )}
      </Row>
    </>
  )
}

export default Devices
