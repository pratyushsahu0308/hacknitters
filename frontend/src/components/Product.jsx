import { Card } from "react-bootstrap";
import React from 'react'
import { Link } from "react-router-dom";
import Rating from "./Rating";
const hover = (e) => {
  e.target.style.transform = "scale(1.05)";
  e.target.style.transition = "0.5s";
}
const hoverOut = (e) => {
  e.target.style.transform = "scale(1)";
  e.target.style.transition = "0.5s";
}

const Product = ({ product}) => {
  return ( 
    <div onMouseOver={hover} onMouseOut={hoverOut}>
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img style={{height:"230px",objectFit:"cover",}} src={product.image} variant="top"/>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="h3" className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

      <Card.Text as='div'>
        <Rating value={product.rating} text={`${product.numReviews} reviews` } />
      </Card.Text>

        <Card.Text as="h4">
          {product.brand}
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Product