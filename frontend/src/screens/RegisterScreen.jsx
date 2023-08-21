import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {useCreateProductMutation} from '../slices/productsApiSlice'
import { useRegisterMutation,useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image,setImage] = useState(''); 
  const [disabled,setDisabled] = useState(false); 
  const [OTP,setOTP] = useState(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createProduct, {isLoading:loadingCreate}] = useCreateProductMutation();
  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  let passKey = '';
  for(let i=0; i<=5; i++) {
    const randomVal = Math.round(Math.random()*9)
    passKey += randomVal;
  }


  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  const [pass,setPass] = useState(); 
const otpHandler = async (e) => {
  e.preventDefault();
  try {
    await updateProfile({name, email, password:passKey})
    setPass(passKey)
    setDisabled(true)
          toast.success('OTP sent successfully')
      } catch (err) {
          toast.error(err?.data.message || err.error)
      }
  
}
  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      if(window.confirm('Are details entered correct?. These cannot be changed later')){
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        const createdProduct = await createProduct();

        navigate(`/book/${createdProduct.data._id}/edit`);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }
}

  return (
    <div>
    <FormContainer>
    <Meta title="Register to Resume Book" />
      <CheckoutSteps step1 />
      <h1 style={{color:"#0f172a"}}>Register</h1>
      <Form onSubmit={otpHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
          
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Row>
          <Col xs={9}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
          disabled={disabled}
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          ></Form.Control>
        </Form.Group>
          </Col>
          <Col xs={3}>            

            
        <Button disabled={isLoading} type='submit' variant='primary' style={{background:"#0f172a",marginRight:"20px"}} className='mt-4 p-3'>
          OTP
        </Button>
       
          </Col>
        </Row>
        




      </Form>
    <Form onSubmit={submitHandler}>
            
    <Form.Group className='my-2' controlId='otp'>
    <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password is encrypted'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

          <Form.Label>OTP</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter OTP'
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
            <Button disabled={pass!==OTP} type='submit' varient='primary' className='my-2' style={{background:"#0f172a",fontSize:"18px"}}>
                Register
            </Button>
            { loadingUpdateProfile && <Loader />}
       </Form>
      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
    {isLoading && <Loader />}
    </div>
  );
};

export default RegisterScreen;
