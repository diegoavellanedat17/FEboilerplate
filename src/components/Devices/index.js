/* eslint-disable */
import React, { useEffect } from 'react'
import { collection, getDocs, query, onSnapshot } from 'firebase/firestore'
import { Row, Col } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap'
import Device from '../Device'
import { db } from '../../firebase'

const Devices = () => {
  const [devicesLoader, setDevicesLoader] = React.useState(true)
  const [getDevices, setGetDevices] = React.useState(null)
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
      setGetDevices(dataGet)
    }

    if (!getDevices) {
      getData()
    } else {
      let update = false
      const updatedDevices = getDevices.map((obj) => {
        if (obj.id === changes.id) {
          update = true
          return { ...obj, ...changes }
        }
        return obj
      })
      if (!update) {
        updatedDevices.push(changes)
      }
      setGetDevices(updatedDevices)
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
        ) : (
          getDevices.map((item) => (
            <Col xs={6} md={3}>
              <Device key={item.id} status={item.status} name={item.name} />
            </Col>
          ))
        )}
      </Row>
    </>
  )
}

export default Devices
