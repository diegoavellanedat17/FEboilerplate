/* eslint-disable */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { motion } from 'framer-motion'
import './Device.css'

const Device = ({ status, name }) => {
  return (
    <motion.div
      className="external-device"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>{name}</h1>
      <p>status:</p>{' '}
      {status === 'inactive' ? <div className="off" /> : <div className="shockwave" />}
    </motion.div>
  )
}

export default Device
