// src/main.jsx or src/index.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Your global CSS
import App from './App.jsx'; // Your App component
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Storecontextprovider from './context/storecontext.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Storecontextprovider>
      <App />
  </Storecontextprovider>
  </BrowserRouter>
);
