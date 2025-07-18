import React, { useState } from 'react';
import Header from '../component/header/header';
import ExploreMenu from '../component/Exprolmenu/exploremenu';
import Fooddisplay from '../component/fooddisplay/fooddisplay';
import MobileApp from './MoblieApp';
import About from './About';

const Home = () => {
  const [category, setcategory] = useState('All');

  return (
    <div className="home">
      {/* Home Section */}
      <section id="home">
        <Header />
      </section>

      {/* Contact Us Section */}
      <section id="About-us" style={{ paddingBottom: '10px',margin:'50px' }}>
        <About />
      </section>

      {/* Menu Section */}
      <section id="menu">
        <ExploreMenu category={category} setcategory={setcategory} />
        <Fooddisplay category={category} />
      </section>

      {/* Mobile App Section */}
      <section id="mobile-app">
        <MobileApp />
      </section>
    </div>
  );
};

export default Home;
