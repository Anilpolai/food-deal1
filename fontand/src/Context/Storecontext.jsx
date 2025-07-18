// import axios from "axios";
// import { createContext, useState, useEffect } from "react";
// // import { food_list } from "../assets/assets";

// export const Storecontext = createContext(null);

// const Storecontextprovider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const [user, setUser] = useState(null);
//   const [food_list,setfoodlist] = useState([]);

//   // Load user from localStorage on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const token = localStorage.getItem("token");
//     if (storedUser && token) {
//       setUser(JSON.parse(storedUser));
//     }

//     fetchFoodList(); // fetch food items on component mount
//   }, []);




//   const fetchFoodList = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/food/list"); // Update URL as needed
//       setfoodlist(response.data.foods || []);
//     } catch (error) {
//       console.error("Failed to fetch food list:", error);
//     }
//   };

//   // Add item to cart
//   const addToCart = (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: (prev[itemId] || 0) + 1,
//     }));
//   };

//   // Remove item from cart
//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
//     }));
//   };

//   // Logout handler
//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   const contextvalue = {
//     food_list,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     user,
//     setUser,
//     logout,
//   };

//   return (
//     <Storecontext.Provider value={contextvalue}>
//       {props.children}
//     </Storecontext.Provider>
//   );
// };

// export default Storecontextprovider;
import axios from "axios";
import { createContext, useState, useEffect } from "react";

// Create context
export const Storecontext = createContext(null);

// Context Provider Component
const Storecontextprovider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState(null);
  const [food_list, setFoodList] = useState([]);

  // Load user and cart from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const savedCart = localStorage.getItem("cart");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    fetchFoodList();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch food list from backend
  const fetchFoodList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/food/list");
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.foods;

      setFoodList(data || []);
    } catch (error) {
      console.error("❌ Failed to fetch food list:", error);
    }
  };

  // Add item to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    setUser(null);
    setCartItems({});
  };

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    user,
    setUser,
    logout,
    refreshFoodList: fetchFoodList, // Optional: to refresh manually
  };

  return (
    <Storecontext.Provider value={contextValue}>
      {children}
    </Storecontext.Provider>
  );
};

export default Storecontextprovider;
