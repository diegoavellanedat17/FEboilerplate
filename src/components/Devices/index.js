/* eslint-disable */
import React, { useEffect } from 'react'
import { collection, getDocs, query, onSnapshot } from 'firebase/firestore'
import { Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { userDevices } from '../../slices'
import Device from '../Device'
import { db } from '../../firebase'
import { clearConfigCache } from 'prettier'

const Devices = () => {
  const dispatch = useDispatch()
  const getUserDevices = useSelector((state) => state.authSlice.devices)

  console.log('esto se renderiza cada rato')

  const [devicesLoader, setDevicesLoader] = React.useState(true)
  const [getDevices, setGetDevices] = React.useState(null)
  const [changes, setChanges] = React.useState(null)

  useEffect(() => {
    console.log('el initial state', getUserDevices)
    const getData = async () => {
      const dataGet = []
      // Only run the first render
      const datos = await getDocs(collection(db, 'devices'))
      datos.forEach((item) => {
        dataGet.push({ ...item.data(), id: item.id })
      })

      setDevicesLoader(false)
      setGetDevices(dataGet)
      dispatch(userDevices(dataGet))
      return dataGet
    }

    if (getUserDevices.length === 0) {
      getData()
    } else {
      console.log('entra aca 1')
      let update = false
      const updatedDevices = getUserDevices.map((obj) => {
        if (obj.id === changes.id) {
          update = true
          return { ...obj, ...changes }
        }
        return obj
      })
      if (!update) {
        console.log('entra aca 2')
        updatedDevices.push(changes)
      }
      setGetDevices(updatedDevices)
      dispatch(userDevices(updatedDevices))
    }
  }, [changes])

  useEffect(() => {
    const realTimeDataQuery = query(collection(db, 'devices'))
    onSnapshot(realTimeDataQuery, (querySnaphot) => {
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
          getUserDevices.map((device) => <Device name={device.name} />)
        )}
      </Row>
    </>
  )
}

export default Devices
