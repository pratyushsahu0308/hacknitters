import React from 'react'
import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios';
import Loader from '../components/Loader';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import ProductCarousel from '../components/ProductCarousel';
import CreateProduct from '../components/CreateProduct';
import { useSelector } from 'react-redux';
import Meta from '../components/Meta';

const HomeScreen = () => {

  const { data: products, isLoading, error } = useGetProductsQuery({
  });
  const { userInfo } = useSelector((state) => state.auth);
  
  return (
    <>  
  
    {isLoading ? (<Loader />) : (
      <> 
    <h1>Latest Industrialist</h1>
    <Row>
        {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                <Product product={product} />
            </Col>
        )
        )}
    </Row>
    <CreateProduct />
    </>)}
    </>
  )
}

export default HomeScreen