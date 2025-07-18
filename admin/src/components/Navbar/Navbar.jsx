import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../img/logo1.png';

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="navbar d-flex align-items-center justify-content-between px-3 py-2 shadow-sm bg-white">
      <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
        <img src={logo} alt="Logo" style={{ height: '40px' }} />
        <span className="fw-bold fs-5 text-tomato">Food-Deal Admin</span>
      </Link>
      <FaBars className="d-md-none fs-4" onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
    </div>
  );
};

export default Navbar;
