import React from 'react'
import { useState,useEffect } from 'react'
import { Table,Form,Button,Row,Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {toast} from 'react-toastify'
import { useProfileMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

const ProfileScreen = (props) => {
const [name,setName] = useState("pratyush");
const [email,setEmail] = useState("pratyush.sahu26@gmail.com");
const [password,setPassword] = useState("1234");

const dispatch = useDispatch();


const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();



const submitHandler = async (e) => {
    e.preventDefault();

        try {
            const res = await updateProfile({name, email, password})

            toast.success('Profile updated successfully')
        } catch (err) {
            toast.error(err?.data.message || err.error)
        }
    
}

return <>

       <Form onSubmit={submitHandler}>
            
            <Button type='submit' varient='primary' className='my-2'>
                Generate OTP
            </Button>
            { loadingUpdateProfile && <Loader />}
       </Form>
</>
}

export default ProfileScreen