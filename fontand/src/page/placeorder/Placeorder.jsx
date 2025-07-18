import React, { useContext, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Storecontext } from '../../Context/Storecontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Placeorder.css';

const Placeorder = () => {
  const { cartItems, food_list } = useContext(Storecontext);
  const navigate = useNavigate();

  const deliveryCharge = 40;
  const discount = 10;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getSubtotal = () => {
    return food_list.reduce((total, item) => {
      return total + item.price * (cartItems[item._id] || 0);
    }, 0);
  };

  const subtotal = getSubtotal();
  const totalAmount = subtotal + deliveryCharge - discount;

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, street, city, state, zip, phone } = formData;

    // Validate all required fields
    if (!firstName || !lastName || !email || !street || !city || !state || !zip || !phone) {
      toast.error("❌ All fields are required!", { position: 'top-right', theme: 'colored' });
      return;
    }

    // Phone number must be exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
      toast.error("📱 Phone number must be exactly 10 digits!", { position: 'top-right', theme: 'colored' });
      return;
    }

    // Zip code must be exactly 6 digits
    if (!/^\d{6}$/.test(zip)) {
      toast.error("📍 Zip code must be exactly 6 digits!", { position: 'top-right', theme: 'colored' });
      return;
    }

    // Email format basic check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("✉️ Enter a valid email address!", { position: 'top-right', theme: 'colored' });
      return;
    }

    // Success
    toast.success('🎉 Order placed successfully!', {
      position: 'top-right',
      autoClose: 3000,
      theme: 'colored',
    });

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <form className="place-order my-5 py-5" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <div className="title">Delivery Information</div>

        <div className="multi-fields">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        </div>

        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
        <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} />

        <div className="multi-fields">
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
        </div>

        <div className="multi-fields">
          <input type="text" name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
        </div>
      </div>

      <div className="place-order-right">
        <div className="title">Order Summary</div>
        <Table bordered className="mb-4">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>₹{subtotal}</td>
            </tr>
            <tr>
              <td>Delivery Charges</td>
              <td>₹{deliveryCharge}</td>
            </tr>
            <tr>
              <td>Promo Discount</td>
              <td className="text-success">- ₹{discount}</td>
            </tr>
            <tr>
              <th>Total</th>
              <th>₹{totalAmount}</th>
            </tr>
          </tbody>
        </Table>

        <div className="text-end">
          <Button
            type="submit"
            variant="success"
            size="lg"
            style={{ transition: 'transform 0.2s ease' }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Place Order
          </Button>
        </div>
      </div>

      <ToastContainer />
    </form>
  );
};

export default Placeorder;
