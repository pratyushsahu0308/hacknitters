import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserListScreen = (props) => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery(props.link);

  return (
    <>

                      <LinkContainer
                        to={`/profile`}
                        style={{ marginRight: '10px' }}
                      >
                        <Button variant='primary' className='btn-sm p-3 m-2 mt-4'>
                          OTP
                        </Button>
                      </LinkContainer>
            
    </>
  );
};

export default UserListScreen;
