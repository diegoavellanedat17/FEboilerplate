import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Landing.css'
import { Container, Row, Col } from 'react-bootstrap'
import { motion } from 'framer-motion'
import Header from '../../components/Header'

const Landing = () => {
  const [rotate, setRotate] = React.useState(false)
  console.log(setRotate)
  return (
    <>
      <Header />
      <Container fluid>
        <Row className="home">
          <Col className="splash">
            <h1>NEENDS Landing Page </h1>
          </Col>
        </Row>
        <motion.div
          animate={{ rotate: rotate ? 180 : 0 }}
          transition={{ delay: 1 }}
          className="animate-test"
          onClick={() => {
            setRotate(!rotate)
            console.log('click')
          }}
        >
          test
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: Infinity, delay: 2 }}
          className="animate-test"
        >
          test
        </motion.div>
      </Container>
    </>
  )
}

export default Landing
