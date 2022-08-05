/* eslint-disable */
import React, { useEffect } from 'react'
import { collection, getDocs, query, onSnapshot } from 'firebase/firestore'
import { Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { userDevices } from '../../slices'
import Device from '../Device'
import { db } from '../../firebase'

const Devices = () => {
  const dispatch = useDispatch()
  const getUserDevices = useSelector((state) => state.authSlice.devices)
  const [devicesLoader, setDevicesLoader] = React.useState(true)
  const [changes, setChanges] = React.useState(null)
  useEffect(() => {
    const getData = async () => {
      const dataGet = []
      // Only run the first render
      const datos = await getDocs(collection(db, 'devices'))
      datos.forEach((item) => {
        dataGet.push({ ...item.data(), id: item.id })
      })

      setDevicesLoader(false)
      dispatch(userDevices(dataGet))
      return dataGet
    }

    if (getUserDevices.length === 0) {
      getData()
    } else {
      let update = false
      const updatedDevices = getUserDevices.map((obj) => {
        if (obj.id === changes.id) {
          update = true
          return { ...obj, ...changes }
        }
        return obj
      })
      if (!update) {
        updatedDevices.push(changes)
      }
      dispatch(userDevices(updatedDevices))
    }
  }, [changes])

  useEffect(() => {
    const realTimeDataQuery = query(collection(db, 'devices'))
    const unsubscribeDevices = onSnapshot(realTimeDataQuery, (querySnaphot) => {
      querySnaphot.docChanges().forEach((change) => {
        setChanges({ ...change.doc.data(), id: change.doc.id })
      })
    })
  }, [])
  return (
    <>
      <Row>
        {devicesLoader ? (
          <Spinner animation="border" variant="success" />
        ) : getUserDevices.length === 0 ? (
          <h1>Esta vacio</h1>
        ) : (
          getUserDevices.map((device) => (
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
