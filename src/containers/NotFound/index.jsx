import React from 'react'
import './NotFound.css'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const NotFound = () => (
  <section className="page_404">
    <Container>
      <div className="row">
        <div className="col-sm-12 ">
          <div className="col-sm-10 col-sm-offset-1  text-center">
            <div className="four_zero_four_bg">
              <h1 className="text-center ">404</h1>
            </div>

            <div className="contant_box_404">
              <h3 className="h2">Look like you&apos;re lost</h3>

              <p>the page you are looking for is not avaible!</p>

              <Link to="/login" className="link_404">
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
)

export default NotFound
