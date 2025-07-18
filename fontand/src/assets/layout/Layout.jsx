import React from 'react';
import NavigationBar from '../../component/NavigationBar';
import Footer from '../../component/Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ setShowLogin }) => {
  return (
    <>
      <NavigationBar setShowLogin={setShowLogin} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};


export default Layout;
