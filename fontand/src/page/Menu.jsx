import React from 'react'
import ExploreMenu from '../component/Exprolmenu/exploremenu';
import Fooddisplay from '../component/fooddisplay/fooddisplay';
import { useState } from 'react';
const Menu = () => {

    const [category, setcategory] = useState('All');

  return (
        <div>
             {/* Menu Section Preview */}
      <section>
        <h2 className="text-center mb-4">Explore Our Menu</h2>
        <ExploreMenu category={category} setcategory={setcategory} />
        <Fooddisplay category={category} />
      </section>
        </div>
  )
}

export default Menu