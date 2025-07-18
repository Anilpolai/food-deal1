import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Cart from './page/Cart';
import Layout from './assets/layout/Layout';
import NotFound from './page/Notfund'; // You can rename to NotFound.jsx
import Loginpoup from './models/loginpoup';
import CreateAccountModal from './models/CreateAccountModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Placeorder from './page/placeorder/Placeorder';
import About from './page/About'            // 🆕 Create this if not present
import Menu from './page/Menu';              // 🆕 Create this if not present
import MobileApp from './page/MoblieApp'; // 🆕 Create this if not present

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  return (
    <>
      {/* Login Modal */}
      <Loginpoup
        show={showLogin}
        onHide={() => setShowLogin(false)}
        onCreateAccount={() => {
          setShowLogin(false);
          setShowCreateAccount(true);
        }}
      />

      {/* Create Account Modal */}
      <CreateAccountModal
        show={showCreateAccount}
        onHide={() => setShowCreateAccount(false)}
        onSwitchToLogin={() => {
          setShowCreateAccount(false);
          setShowLogin(true);
        }}
      />

      {/* Toast Container */}
      <ToastContainer />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Layout setShowLogin={setShowLogin} />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="placeorder" element={<Placeorder />} />
          
          {/* New pages (shown via navigation) */}
          <Route path="about" element={<About />} />
          <Route path="menu" element={<Menu />} />
          <Route path="mobile" element={<MobileApp/>} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
