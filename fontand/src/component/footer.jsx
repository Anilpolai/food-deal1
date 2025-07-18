import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <Container>
        <Row className="text-center text-md-start align-items-center">
          {/* Brand Info */}
          <Col md={4} className="mb-4">
            <h5 className="footer-brand">Food Del</h5>
            <p>
              Delicious food delivered fast to your doorstep. Experience taste
              and convenience like never before.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-4">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="home" smooth={true} duration={800} className="footer-link">Home</Link></li>
              <li><Link to="menu" smooth={true} duration={800} className="footer-link">Menu</Link></li>
              <li><Link to="mobile-app" smooth={true} duration={800} className="footer-link">Mobile App</Link></li>
              <li><Link to="contact-us" smooth={true} duration={800} className="footer-link">Contact Us</Link></li>
            </ul>

          </Col>

          {/* Contact & Social */}
          <Col md={4} className="mb-4">
            <h6>Contact</h6>
            <p><FaEnvelope className="me-2" /> support@fooddel.com</p>
            <div className="social-icons d-flex justify-content-center justify-content-md-start mt-2">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="me-3 text-white"><FaFacebookF /></a>
              <a href="https://www.instagram.com/accounts/login/?hl=en" target="_blank" rel="noreferrer" className="me-3 text-white"><FaInstagram /></a>
              <a href="https://twitter.com/i/flow/signup" target="_blank" rel="noreferrer" className="me-3 text-white"><FaTwitter /></a>
            </div>
          </Col>
        </Row>

        <hr className="bg-white" />
        <p className="text-center mb-0">
          &copy; {new Date().getFullYear()} Food Del. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
