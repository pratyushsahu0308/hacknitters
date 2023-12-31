import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table,Row,Col,Button } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetProductsQuery, useCreateProductMutation,useDeleteProductMutation } from '../../slices/productsApiSlice'
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const ProductListScreen = () => {
    const { data: products, isLoading, error, refetch} = useGetProductsQuery();
    const [createProduct, {isLoading:loadingCreate}] = useCreateProductMutation();
    const [deleteProduct, {isLoading:loadingDelete}] = useDeleteProductMutation();
    const navigate = useNavigate();
const deleteHandler = async (id) => {
    if(window.confirm('Are you sure?')) {
        try {
            await deleteProduct(id);
            refetch();
            toast.success('Book deleted');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
}
const createProductHandler = async () => {
    if(window.confirm('Are you sure you want to create a new product')){
        try {
            await createProduct();
            refetch();
            navigate("book/:id/edit");
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
}

  return (
    <>
        <Row className='align-items-center'>
            <Col>
                <h1>Books</h1>
            </Col>

        </Row>
        {loadingCreate && <Loader />}
        {loadingDelete && <Loader />}
        {isLoading ? <Loader /> : (
            <>
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>


                            <th>Headline</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>


                                <td>{product.brand}</td>
                                <td>
                                        <Button varient='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}><FaTrash /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        )}
    </>
  )
}

export default ProductListScreen