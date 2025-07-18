import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPlus, FaList, FaShoppingCart } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ show }) => {
  const path = useLocation().pathname;

  return (
    <div className={`sidebar bg-light p-3 ${show ? 'd-block' : 'd-none d-md-block'}`}>
      <h4 className="mb-4">Admin Panel</h4>
      <div className="d-flex flex-column gap-3">
        <Link to="/additem" className={`sidebar-link ${path === '/additem' ? 'active' : ''}`}>
          <FaPlus /> Add Items
        </Link>
        <Link to="/listitem" className={`sidebar-link ${path === '/listitem' ? 'active' : ''}`}>
          <FaList /> List Items
        </Link>
        <Link to="/order" className={`sidebar-link ${path === '/order' ? 'active' : ''}`}>
          <FaShoppingCart /> Orders
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
