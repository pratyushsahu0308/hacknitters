import React from 'react'
import { useState,useEffect } from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import {toast} from 'react-toastify'
import { useUpdateProductMutation, useGetProductDetailsQuery,useUploadProductImageMutation,useUploadProductPdfMutation } from '../../slices/productsApiSlice'
import Meta from '../../components/Meta'
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../../components/CheckoutSteps'
import { TiArrowBack } from 'react-icons/ti'
const ProductEditScreen = () => {
    const {id: productId} = useParams();
    const { userInfo } = useSelector((state) => state.auth);
const [name,setName] = useState(userInfo.name);
const [price,setPrice] = useState(0);
const [image,setImage] = useState('');
const [brand,setBrand] = useState('');
const [category,setCategory] = useState('');
const [countInStock,setCountInStock] = useState(0);
const [description,setDescription] = useState('');

const {data:product,isLoading,refetch,error} =useGetProductDetailsQuery(productId);
const [updateProduct,{isLoading: loadingUpdate}] = useUpdateProductMutation();

const [uploadProductImage, {isLoading: loadingUpload}] =useUploadProductImageMutation();
const [uploadProductPdf, {isLoading: loadingPdf}] =useUploadProductPdfMutation();

const navigate = useNavigate();

useEffect(() => {
    if(product) {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
    }
}, [product]);
const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct ={
        productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
    };
    const result = await updateProduct(updatedProduct);
    if(result.errorz){
        toast.error(result.error);
    }else {
        toast.success('Book updated');
        refetch()
        navigate('/admin/productlist');
    }
}
const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image',e.target.files[0]);
    try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        setImage(res.image);
    } catch (err) {
        toast.error(err?.data?.message || "error")
    }
}
const uploadResumeHandler = async (e) => {
    const formData = new FormData();
    formData.append('resume',e.target.files[0]);
    try {
        const res = await uploadProductPdf(formData).unwrap();
        toast.success(res.message);
        setCategory(res.image);
    } catch (err) {
        toast.error(err?.data?.message || "error")
    }
}

  return (
    <>
    <Meta title="Edit Screen" />
            <Link className='btn my-3' style={{fontSize:"18px",background:"#fff",color:"#0f172a",boxShadow: "0px 0px 30px rgba(127, 137, 161, 0.25)",}} to='/'>
                <TiArrowBack />
            </Link>
    <FormContainer>
    <CheckoutSteps step1 step2 />
        <h1>Enter Details</h1>
        {loadingUpdate && <Loader />}

        {isLoading? <Loader /> : (
            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='brand' className='my-2'>
                <Form.Label>Headline</Form.Label>
                <Form.Control 
                required
                type='text'
                placeholder='Enter Headline'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}>
                </Form.Control>
                </Form.Group>
                
                
                <Form.Group controlId='image' className='my-2'>
                    <Form.Label>Image (300 X 300) recommended</Form.Label>
                    <Form.Control required type='text' placeholder='Enter image url ' value={image} onChange={(e) => setImage}></Form.Control>
                    <Form.Control type='file' label='Choose file' onChange={uploadFileHandler}></Form.Control>
                </Form.Group>
                {loadingUpload && <Loader />}
                
                



                <Button
                disabled={product.user!==userInfo._id}
                type='submit'
                variant='primary'
                className='my-2'
                >Submit</Button>
            </Form>
        )}
    </FormContainer>
    </>
  )
}

export default ProductEditScreen