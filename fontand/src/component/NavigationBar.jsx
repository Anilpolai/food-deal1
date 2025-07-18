import { useEffect, useState, useContext } from 'react';
import { Navbar, Container, Button, Nav, Dropdown } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Storecontext } from '../Context/Storecontext';
import logo from '../img/logo1.png';
import './Navbar.css';

const NavigationBar = ({ setShowLogin }) => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, user, logout } = useContext(Storecontext);

  const getTotalCartQuantity = () =>
    Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);

  const isHomePage = location.pathname === '/';
  const isCartPage = location.pathname === '/cart';

  useEffect(() => {
    if (!isHomePage) {
      setScrolled(false);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleLogoClick = () => {
    setExpanded(false);
    navigate('/');
  };

  const navbarClass = isHomePage
    ? scrolled
      ? 'navbar-colored'
      : 'navbar-transparent'
    : 'navbar-colored';

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`shadow-sm ${navbarClass} ${isHomePage ? 'home-navbar' : 'other-navbar'} ${isCartPage ? 'cart-page' : ''}`}
      expanded={expanded}
      onToggle={(val) => setExpanded(val)}
    >
      <Container>
        <span onClick={handleLogoClick} style={{ cursor: 'pointer' }} className="d-flex align-items-center">
          <img src={logo} alt="Logo" height="50" className="me-2" />
          <span className="brand-name">Food Deal</span>
        </span>

        {/* Mobile Cart Icon */}
        <div className="d-flex d-lg-none gap-3 ms-auto position-relative">
          <NavLink to="/cart" className="text-dark position-relative" onClick={() => setExpanded(false)}>
            <FaShoppingCart />
            {getTotalCartQuantity() > 0 && (
              <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {getTotalCartQuantity()}
              </span>
            )}
          </NavLink>
        </div>

        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="mx-auto text-center d-flex flex-column flex-lg-row gap-3">
            <NavLink to="/" className="nav-link" onClick={() => setExpanded(false)}>
              Home
            </NavLink>
            <NavLink to="/about" className="nav-link" onClick={() => setExpanded(false)}>
              About Us
            </NavLink>
            <NavLink to="/menu" className="nav-link" onClick={() => setExpanded(false)}>
              Menu
            </NavLink>
            <NavLink to="/mobile" className="nav-link" onClick={() => setExpanded(false)}>
              Mobile App
            </NavLink>

            {/* Mobile Profile/Login */}
            <div className="d-lg-none">
              {user ? (
                <>
                  <span className="nav-link">Hi, {user.name}</span>
                  <Button variant="link" className="nav-link text-danger p-0" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <span className="nav-link" onClick={() => { setShowLogin(true); setExpanded(false); }}>
                  Log In
                </span>
              )}
            </div>
          </Nav>

          {/* Desktop Icons & Profile */}
          <div className="d-none d-lg-flex align-items-center gap-5 position-relative">
            <NavLink to="/cart" className="text-dark position-relative" onClick={() => setExpanded(false)}>
              <FaShoppingCart />
              {getTotalCartQuantity() > 0 && (
                <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {getTotalCartQuantity()}
                </span>
              )}
            </NavLink>

            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-dark" className="rounded-4 px-3" size="sm">
                  {user.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>Hi, {user.name}</Dropdown.Header>
                  <Dropdown.ItemText>
                    <strong>Email:</strong> {user.email}
                  </Dropdown.ItemText>
                  <Dropdown.Divider />
                  <Dropdown.Item className="text-danger" onClick={logout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                variant="outline-danger rounded-4 px-3"
                size="sm"
                onClick={() => setShowLogin(true)}
              >
                Log In
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
