import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { menu_list } from '../../assets/assets';
import './ExploreMenu.css';

const ExploreMenu = ({ category, setcategory }) => {
  return (
    <Container id="explore-menu" className="my-5">
      <h1 className="text-center mb-3">Explore Our Menu</h1>
      <p className="text-center text-muted mb-5">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience — one delicious meal at a time.
      </p>
      <Row className="g-4 justify-content-center text-center">
        {/* Show All Food Option */}
        <Col>
          <div className="menu-item" onClick={() => setcategory('All')}>
            <div className={`menu-img all-category ${category === 'All' ? 'active' : ''}`}>
              <span className="all-text">All</span>
            </div>
            <p className="menu-name mt-2">All Food</p>
          </div>
        </Col>

        {/* Dynamic Menu Categories */}
        {menu_list.map((item, index) => (
          <Col key={index}>
            <div
              className="menu-item"
              onClick={() =>
                setcategory((prev) =>
                  prev === item.menu_name ? 'All' : item.menu_name
                )
              }
            >
              <img
                src={item.menu_img}
                alt={item.menu_name}
                className={`menu-img ${category === item.menu_name ? 'active' : ''}`}
              />
              <p className="menu-name mt-2">{item.menu_name}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExploreMenu;
