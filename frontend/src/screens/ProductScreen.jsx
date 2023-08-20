import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form,Row, Col, Image, ListGroup, Card, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating.jsx';
import axios from 'axios';
import { addToCart } from '../slices/cartSlice.js';
import {
  useGetProductDetailsQuery, useCreateReviewMutation
} from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify'
import Message from '../components/Message'
import Meta from '../components/Meta.jsx';
import { FaHeart } from 'react-icons/fa';
import {TiArrowBack} from 'react-icons/ti';
import ResumeViewer from '../components/ResumeViewer.jsx';

const ProductScreen = (props) => {

    const {id:productId} = useParams();
    const [qty, setQty] = useState(1);
    const [rating,setRating] = useState(0);
    const [comment, setComment] =useState('');
    const [showResume, setShowResume] =useState();

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
     data: product, isLoading, refetch
    } = useGetProductDetailsQuery(productId);
    
const [createReview, { isLoading: loadingProductReview}] = useCreateReviewMutation();
const {userInfo} = useSelector((state) => state.auth);

      const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty:1 }));
        toast("Added to favorites ❤️")
      };

      const submitHandler = async (e) => {
        e.preventDefault();
    
        try {
          await createReview({
            productId,
            rating,
            comment,
          }).unwrap();
          refetch();
          toast.success('Review created successfully');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };
      
      const showResumeHandler = (e) => {
          {showResume ? setShowResume(false) : setShowResume(true)};
      };

      
    return (
        <>
            <Link className='btn my-3' style={{fontSize:"18px",background:"#fff",color:"#0f172a",boxShadow: "0px 0px 30px rgba(127, 137, 161, 0.25)",}} to='/'>
                <TiArrowBack /> 
            </Link>
            {isLoading ? (<Loader />) : (
            <>
            <Meta title={product.name} /><Row >
                <Col md={4} className='m-2 text-center'>
                    <Image src={product.image} alt={product.name} style={{borderRadius:"50%",width:"300px",height:"300px",objectFit:"cover",boxShadow: "0px 0px 30px rgba(127, 137, 161, 0.25)",}} fluid />
                </Col>
                <Col md={7} className='m-1'>
              <Card className='m-2'>
                  <Row className='m-2'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                             {product.brand}
                        </ListGroup.Item>

                    </ListGroup>
                    </Row>
                    </Card>
              
                    <Row>
                    <Card className='m-2'>
                <ListGroup variant='flush'>
                  
                  <ListGroup.Item>
                    <Row className='text-center'>
                      <Col xs={4}>
                        
                        <Button
                        className='btn-block btn-lg'
                        style={{background:"#0f172a"}}
                        type='button'
                        onClick={showResumeHandler}
                    >Resume</Button>

                      </Col>
                      <Col xs={6} className='my-2' ><Rating value={product.rating} text={`${product.numReviews} reviews` } /></Col>
                        <Col xs={2}>
                    <Button
                        className='btn-block btn-lg'
                        style={{background:"#fff"}}
                        type='button'
                        onClick={addToCartHandler}
                    >
                      <FaHeart style={{color:"#800020"}} />
                    </Button>
                    </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
                    </Row>
                </Col>
          </Row>
{showResume && (
<Container className='my-5'><ResumeViewer src={product.category} /></Container>)}
        <Container style={{background:"#fff",borderRadius:"2%",boxShadow: "0px 0px 30px rgba(127, 137, 161, 0.25)"}}>
          <Row className='review my-4'>
            <Col md={12} className='p-3'>
              <h1>Reviews</h1>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup varient = 'flush'>
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0,10)}</p>
                  <p>{review.comment}</p>
                  </ListGroup.Item>)
                )}
                <ListGroup.Item>
                  <h2>Write a Review</h2>

                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating' className='my-2'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}>
                          <option value=''>Select...</option>
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                          <option value='4'>4</option>
                          <option value='5'>5</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment' className='my-2'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control 
                        as='textarea'
                        row='3'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}>

                        </Form.Control>
                        <Button 
                        disabled={loadingProductReview}
                        type='submit'
                        varient='primary'
                        >Submit</Button>
                      </Form.Group>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
          </>)}
        </>
    )
}

export default ProductScreen;