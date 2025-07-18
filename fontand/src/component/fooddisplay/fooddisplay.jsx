import React, { useContext } from 'react';
import { Storecontext } from '../../Context/Storecontext';
import FoodItem from '../fooditem/fooditem';
import { Row, Col, Container } from 'react-bootstrap';
import './fooddisplay.css';
import '../../App.css';

const FoodDisplay = ({ category }) => {
  const { food_list, cartItems, addToCart, removeFromCart } = useContext(Storecontext);

  return (
    <div className="food-display" id="food-display">
      <Container className="py-5">
        <h2 className="text-center mb-4">Top dishes near you</h2>
        <Row className="g-4">
          {food_list
            .filter(item => category === 'All' || item.category === category)
            .map(item => (
              <Col key={item._id} xs={12} sm={6} md={4} lg={3}>
                <FoodItem
                  _id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  quantity={cartItems[item._id] || 0}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default FoodDisplay;
