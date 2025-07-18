import React, { useContext, useState } from 'react';
import { Table, Button, Container, Image, Alert, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Storecontext } from '../Context/Storecontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(Storecontext);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const deliveryCharge = 40;

  const getSubtotal = () => {
    return food_list.reduce((total, item) => {
      return total + item.price * (cartItems[item._id] || 0);
    }, 0);
  };

  const cartNotEmpty = food_list.some(item => cartItems[item._id] > 0);
  const subtotal = getSubtotal();
  const totalAmount = subtotal + (cartNotEmpty ? deliveryCharge : 0) - discount;

  const handleApplyPromo = () => {
    if (promoCode === 'SAVE10' && !promoApplied) {
      setDiscount(10);
      setPromoApplied(true);
    }
  };

  const handleCheckout = () => {
    toast.success('Redirecting to checkout...', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    });

    setTimeout(() => {
      navigate('/placeorder');
    }, 2000);
  };

  return (
    <Container className="my-5 py-5">
      <h2 className="text-center mb-4">Your Cart</h2>

      {!cartNotEmpty ? (
        <Alert variant="warning" className="text-center">
          Your cart is empty.
        </Alert>
      ) : (
        <>
          <Table responsive bordered hover className="text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {food_list.map((item) => {
                const quantity = cartItems[item._id];
                if (quantity > 0) {
                  return (
                    <tr key={item._id}>
                      <td>
                        <Image src={`http://localhost:5000/images/${item.image}`} alt={item.name} rounded fluid style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                      </td>
                      <td>{item.name}</td>
                      <td>₹{item.price}</td>
                      <td>{quantity}</td>
                      <td>₹{item.price * quantity}</td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => removeFromCart(item._id)}>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </Table>

          <Row className="justify-content-end mt-4">
            <Col md={6}>
              <Form className="mb-3 d-flex">
                <Form.Control
                  type="text"
                  placeholder="Enter Promo Code (e.g., SAVE10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                />
                <Button
                  variant="outline-success"
                  onClick={handleApplyPromo}
                  className="ms-2"
                  disabled={promoApplied}
                >
                  {promoApplied ? 'Applied' : 'Apply'}
                </Button>
              </Form>

              <Table bordered>
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td>₹{subtotal}</td>
                  </tr>
                  <tr>
                    <td>Delivery Charges</td>
                    <td>₹{deliveryCharge}</td>
                  </tr>
                  {discount > 0 && (
                    <tr>
                      <td>Promo Discount</td>
                      <td className="text-success">- ₹{discount}</td>
                    </tr>
                  )}
                  <tr>
                    <th>Total</th>
                    <th>₹{totalAmount}</th>
                  </tr>
                </tbody>
              </Table>

              <div className="text-end">
                <Button
                  variant="success"
                  size="lg"
                  style={{ transition: 'transform 0.2s ease' }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </Col>
          </Row>
        </>
      )}

      <ToastContainer />
    </Container>
  );
};

export default Cart;
