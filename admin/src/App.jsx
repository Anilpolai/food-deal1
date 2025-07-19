import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/navbar';
import Sidebar from './components/sidebar';
import { Routes, Route } from 'react-router-dom';
import Additem from './page/additem';
import Listitem from './page/listitem';
import Order from './page/order';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="app-container">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="d-flex">
        <Sidebar show={sidebarOpen} />
        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/additem" element={<Additem />} />
            <Route path="/listitem" element={<Listitem />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
