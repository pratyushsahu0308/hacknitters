import { Spinner } from "react-bootstrap";
import React from 'react'

const Loader = () => {
  return (
    <Spinner 
        animation="grow"
        role="status"
        style={{
            width: "50px",
            height: "50px",
            margin: "auto",
            marginTop: "3rem",
            display: "block",
            color:"#0f172a",
        }}
    ></Spinner>
  )
}

export default Loader