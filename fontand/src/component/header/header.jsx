import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleViewMenu = () => {
    if (location.pathname === '/') {
      scroller.scrollTo('menu', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -70,
      });
    } else {
      navigate('/', { state: { scrollTo: 'menu' } });
    }
  };

  return (
    <div className="header-carousel">
      <Carousel
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3000}
        transitionTime={1000}
      >
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className={`header-slide bg-img-${i + 1}`}>
            <div className="overlay text-white text-center d-flex justify-content-center align-items-center">
              <div className="container">
                <h2>
                  {i === 0 && 'Order your favorite food here'}
                  {i === 1 && 'Delicious Meals Anytime'}
                  {i === 2 && 'Quality Ingredients, Quality Food'}
                  {i === 3 && 'Fast Delivery Service'}
                </h2>
                <p>
                  {i === 0 &&
                    'Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.'}
                  {i === 1 &&
                    'Freshly prepared, fast delivered, and full of flavor — anytime you need it.'}
                  {i === 2 &&
                    'Only the best ingredients go into our dishes to give you the taste you deserve.'}
                  {i === 3 &&
                    'Hot, fresh meals delivered quickly — right to your doorstep.'}
                </p>
                <button className="btn btn-danger mt-3" onClick={handleViewMenu}>
                  View Menu
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Header;
