import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel,Image } from 'react-bootstrap'
import Loader from './Loader'
import { productsApiSlice, useGetTopProductsQuery } from '../slices/productsApiSlice'

const ProductCarousel = () => {
    const {data: product, isLoading} = useGetTopProductsQuery()

  return isLoading ? <Loader /> : (
    <Carousel pause='hover' className='bg-primary my-5'>
        {product.map(product => (
            <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid />
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{product.name} (${product.price})</h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
  )
}

export default ProductCarousel