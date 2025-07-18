import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import '../App.css';

const MobileApp = () => {
  return (
    <Container className="my-5 py-5" id="mobile-app">
      <Row className="align-items-center">
        <Col md={6} className="mb-4">
          <h1 className="mb-3">Get Our Mobile App</h1>
          <p className="text-muted mb-4">
            Enjoy seamless ordering on the go! Download our mobile app and get exclusive discounts, easy access to your favorite dishes, and real-time order tracking.
          </p>

          <div className="d-flex flex-wrap gap-3">
            <a
              href="https://play.google.com/store/games?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="store-button google-play"
            >
              <FaGooglePlay size={22} />
              <span>Google Play</span>
            </a>

            <a
              href="https://apps.apple.com/app/yourapp"
              target="_blank"
              rel="noopener noreferrer"
              className="store-button app-store"
            >
              <FaApple size={22} />
              <span>App Store</span>
            </a>
          </div>
        </Col>

        <Col md={6}>
          <Card className="shadow-lg border-0">
            <Card.Img
              variant="top"
              src="https://cdn.dribbble.com/userupload/15813575/file/original-a8a3da02b3b0b82933d3aacac0b16496.png?resize=1600x1200"
              alt="Mobile app screenshot"
              style={{ borderRadius: '15px' }}
            />
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={4} className="text-center feature-card">
          <h4>Easy Ordering</h4>
          <p className="text-muted">Order your favorite dishes in just a few taps.</p>
        </Col>
        <Col md={4} className="text-center feature-card">
          <h4>Real-time Tracking</h4>
          <p className="text-muted">Track your order status live until it arrives.</p>
        </Col>
        <Col md={4} className="text-center feature-card">
          <h4>Exclusive Offers</h4>
          <p className="text-muted">Get app-only discounts and special promotions.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MobileApp;
