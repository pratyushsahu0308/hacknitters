import React, {useEffect, useState} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table,Row,Col,Button } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Message from './Message'
import Loader from './Loader'
import { useGetProductsQuery, useCreateProductMutation,useDeleteProductMutation } from '../slices/productsApiSlice'
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { userApiSlice } from '../slices/usersApiSlice'
import { useSelector } from 'react-redux';
const CreateProduct = () => {
    const [createProduct, {isLoading:loadingCreate}] = useCreateProductMutation();
    const { data: products, isLoading, error, refetch} = useGetProductsQuery();

    const navigate = useNavigate();
    const {userInfo} = useSelector((state) => state.auth);

const editProductHandler = async () => {
    try {
        navigate(`/admin/product/${(products.find(item => item.user === userInfo._id))._id}/edit`);
    } catch (err) {
        toast.error("Book not found")
    }
}
const createProductHandler = async () => {

        navigate(`/register`);

}

  return (
    <>  
      <Row className='align-items-center'>
            <Col className='text-end'>
                { !userInfo ? (<>
                <Button className='btn-lg m-3' style={{background:"#0f172a",position:"fixed",bottom:"5px",right:"5px"}} onClick={createProductHandler}>
                     <FaEdit /> Create Book
                </Button></>) :(<>
                <Button className='btn-lg m-3' style={{background:"#0f172a",position:"fixed",bottom:"5px",right:"5px"}} onClick={editProductHandler}>
                     <FaEdit /> Edit Book
                </Button></>)}

            </Col>
        </Row>
        {loadingCreate && <Loader />}
        
    </>
  )
}

export default CreateProduct;