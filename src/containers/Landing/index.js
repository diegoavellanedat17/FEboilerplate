import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Landing.css'
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../../components/Header'

const Landing = () => {
  return (
    <>
      <Header />
      <Container fluid>
        <Row className="home">
          <Col className="splash">
            <h1>NEENDS Landing Page </h1>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Landing
