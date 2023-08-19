  import React from 'react'
  import { Link, useNavigate } from 'react-router-dom';
  import { Badge, Navbar, Nav, Container, NavbarBrand, NavDropdown} from 'react-bootstrap';
  import { FaUser } from 'react-icons/fa';
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
        <Navbar fixed="top" style={{  boxShadow: "0px 0px 30px rgba(127, 137, 161, 0.25)", zIndex:100, background: "#fff"}} data-bs-theme="light" expand="md" collapseOnSelect>
            <Container >
                <Navbar.Brand style={{fontFamily: "Raleway",fontWeight:700,color:"#0f172a",fontSize:"28px"}}>

                  RESUME BOOK

                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto" style={{fontWeight:500,fontSize:"18px"}}>
                      <LinkContainer to='/favorites'>
                        <Nav.Link>❤️ Favorites
                        {
                          cartItems.length>0 && (
                            <Badge pill  style={{marginLeft: '5px',background:"#0f172a"}}>
                                {cartItems.reduce((a,c) => a + c.qty,0)}
                            </Badge>
                          )
                        }
                        </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                          <NavDropdown title={userInfo.name} id='username'>
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                          </NavDropdown>
                        ) : (<LinkContainer to='/login'>
                        <Nav.Link href='/login'><FaUser /> Sign In</Nav.Link>
                        </LinkContainer>)}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                              <LinkContainer to='/admin/productlist'>
                                <NavDropdown.Item>Books</NavDropdown.Item>
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