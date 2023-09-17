import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3}) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Link to='/register'>
        <Nav.Item>
            {step1 ? (

                    <Nav.Link>Shepherd</Nav.Link>
             
            ) : (<Nav.Link disabled>Shepherd</Nav.Link>)}
        </Nav.Item>
        </Link>
        <Link to='/registerindustrialist'>
        <Nav.Item>
            {step2 ? (

                    <Nav.Link>Industrialist</Nav.Link>
             
            ) : (<Nav.Link disabled>Industrialist</Nav.Link>)}
        </Nav.Item>
        </Link>
        <Link to='/registerserviceprovider'>
        <Nav.Item>
            {step3 ? (

                    <Nav.Link>Service Provider</Nav.Link>
             
            ) : (<Nav.Link disabled>Service Provider</Nav.Link>)}
        </Nav.Item>
        </Link>
    </Nav>
  )
}

export default CheckoutSteps