import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Row>
      <Col md={12}>
        <h1 style={{ marginBottom: '20px' }}>Favorites</h1>
        {cartItems.length === 0 ? (
          <Message>
            List is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id} className='my-1' style={{boxShadow: "0px 0px 30px rgba(127, 137, 161, 0.25)"}}>
                <Row>
                  <Col md={3}>
                    <Image src={item.image} alt={item.name} fluid rounded style={{height:"100px"}} />
                  </Col>
                  <Col md={5} className='text-center'>
                    {/* <Link to={`/product/${item._id}`} className='my-3'><h3>{item.name}</h3></Link> */}
                  </Col>
                  <Col md={2}></Col>
                  <Col md={2} className='text-end'>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

    </Row>
  );
};

export default CartScreen;
