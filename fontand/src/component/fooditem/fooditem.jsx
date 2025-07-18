import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './fooditem.css';
import '../../App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FoodItem = ({ _id, name, price, description, image, rating = 4, quantity, addToCart, removeFromCart }) => {
  const renderStars = () => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) => (
      <span key={index} style={{ color: index < rating ? '#ffc107' : '#e4e5e9' }}>
        ★
      </span>
    ));
  };
  console.log(image)

  const handleAddToCart = () => {
    addToCart(_id);
    toast.success(`${name} added to cart!`, {
      position: 'top-right',
      icon: '🛒',
      autoClose: 1200,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: 'colored',
    });
  };

  return (
    <Card className="food-item shadow-sm">
      <Card.Img variant="top" src={`http://localhost:5000/images/${image}`} className="food-item-img" />
      
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{name}</Card.Title>
        <div className="food-item-rating mb-2">{renderStars()}</div>
        <Card.Text className="text-muted small">{description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <strong className="text-danger">₹{price}</strong>
          {quantity > 0 ? (
            <div className="d-flex align-items-center gap-2">
              <Button variant="danger" size="sm" onClick={() => removeFromCart(_id)}>-</Button>
              <span>{quantity}</span>
              <Button variant="success" size="sm" onClick={handleAddToCart}>+</Button>
            </div>
          ) : (
            <Button variant="outline-primary" size="sm" onClick={handleAddToCart}>Add to Cart</Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default FoodItem;
