import React from 'react'
import { useState,useEffect } from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import {toast} from 'react-toastify'
import { useUpdateUserMutation, useGetUserDetailsQuery,useProfileMutation } from '../../slices/usersApiSlice'
import { TiArrowBack } from 'react-icons/ti'

const UserEditScreen = () => {
    const {id: userId} = useParams();

const [name,setName] = useState('');
const [email,setEmail] = useState('');
const [isAdmin,setIsAdmin] = useState(false);

const {getUserById,data:user,isLoading,refetch,error} =useGetUserDetailsQuery(userId);
const [updateUser,{isLoading: loadingUpdate}] = useUpdateUserMutation();
const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();
const navigate = useNavigate();

useEffect(() => {
    if(user) {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
    }
}, [user]);
const submitHandler = async (e) => {
    e.preventDefault();
    try {
        await updateProfile({name, email});
        toast.success('OTP sent successfully')
        refetch();
        navigate('/register')
    } catch (err) {
        toast.error(err?.data?.message || err.error)
    }
}


  return (
    <>
            <Link className='btn my-3' style={{fontSize:"18px",background:"#fff",color:"#0f172a",boxShadow: "0px 0px 30px rgba(127, 137, 161, 0.25)",}} to='/register'>
                <TiArrowBack />
            </Link>
    <FormContainer>
        <h1>Sending OTP ...</h1>
        {loadingUpdate && <Loader />}

        {isLoading? <Loader /> : (
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='name' className='my-2'>
                <Form.Label></Form.Label>
                <Form.Control 
                type='name'
                placeholder='Enter name'
                value={"OTP sent from : resumebook.medicaps@gmail.com"}
                onChange={(e) => setName()}>
                </Form.Control>
                </Form.Group>
                {/* <Form.Group controlId='email' className='my-2'>
                <Form.Label></Form.Label>
                <Form.Control 
                type='email'
                placeholder='Enter email'
                value={"Return back to submit the OTP "}
                onChange={(e) => setEmail()}>
                </Form.Control>
                </Form.Group>
                 */}
                <Button disabled={isLoading} type='submit' variant='primary' style={{background:"#0f172a",marginRight:"20px"}} className='mt-2'>
                 Back
        </Button>

            </Form>
        )}
    </FormContainer>
    </>
  )
}

export default UserEditScreen