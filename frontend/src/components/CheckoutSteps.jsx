import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2}) => {
  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {step1 ? (

                    <Nav.Link>Register</Nav.Link>
             
            ) : (<Nav.Link disabled>Register</Nav.Link>)}
        </Nav.Item>
        <Nav.Item>
            {step2 ? (

                    <Nav.Link>Update Book</Nav.Link>
             
            ) : (<Nav.Link disabled>Update Book</Nav.Link>)}
        </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps