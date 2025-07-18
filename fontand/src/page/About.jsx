import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css'; // Make sure to create and import this CSS file

const About = () => {
  return (
    <Container className="my-5 py-5" id="about-us">
      <Row className="align-items-center">
        <Col md={6}>
          <img
            src="https://i.pinimg.com/736x/15/b0/8d/15b08d3d8b411079a8b3a8a2b8a2b23e.jpg"
            alt="Delicious food on a plate"
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={6}>
          <h2 className="mb-4 fs-1 text-center">About Food Deal</h2>
          <p>
            Welcome to Food Deal! We are passionate about delivering delicious food
            made with the freshest ingredients. Whether you crave something spicy,
            sweet, or savory, our menu has something for everyone.
          </p>
          <p>
            Our mission is to bring joy to your table through our meals — quickly,
            safely, and conveniently.
          </p>

          {/* Services Section */}
          <Row className="mt-4  text-center">
            <Col xs={4} className="service-box">
              <i className="bi bi-truck fs-2 mb-2 d-block"></i>
              <p className="mb-0">Fast Delivery</p>
            </Col>
            <Col xs={4} className="service-box">
              <i className="bi bi-shield-check fs-2 mb-2 d-block"></i>
              <p className="mb-0">Secure Payment</p>
            </Col>
            <Col xs={4} className="service-box">
              <i className="bi bi-clock-history fs-2 mb-2 d-block"></i>
              <p className="mb-0">24/7 Support</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
