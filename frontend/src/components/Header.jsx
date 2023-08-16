  import React from 'react'
  import { useNavigate } from 'react-router-dom';
  import { Badge, Navbar, Nav, Container, NavbarBrand, NavDropdown} from 'react-bootstrap';
  import { FaBook, FaUser } from 'react-icons/fa';
  import logo from '../assets/logo.png'
  import {LinkContainer} from 'react-router-bootstrap'
  import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';

  const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        dispatch(resetCart());
        navigate('/login');
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
            <Container>
                <Navbar.Brand>
                  <img src={logo} style={{width: 25}}/> MediNotes
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                      <LinkContainer to='/cart'>
                        <Nav.Link><FaBook /> Cart
                        {
                          cartItems.length>0 && (
                            <Badge pill bg='success' style={{marginLeft: '5px'}}>
                                {cartItems.reduce((a,c) => a + c.qty,0)}
                            </Badge>
                          )
                        }
                        </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                          <NavDropdown title={userInfo.name} id='username'>
                            <LinkContainer to='/profile'>
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                          </NavDropdown>
                        ) : (<LinkContainer to='/login'>
                        <Nav.Link href='/login'><FaUser /> Sign In</Nav.Link>
                        </LinkContainer>)}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                              <LinkContainer to='/admin/productlist'>
                                <NavDropdown.Item>Products</NavDropdown.Item>
                              </LinkContainer>
                              <LinkContainer to='/admin/userlist'>
                                <NavDropdown.Item>Users</NavDropdown.Item>
                              </LinkContainer>
                              <LinkContainer to='/admin/orderList'>
                                <NavDropdown.Item>Orders</NavDropdown.Item>
                              </LinkContainer>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
      </header>
    )
  }
  
  export default Header