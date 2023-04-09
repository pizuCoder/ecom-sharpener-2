import React, { useState, useEffect } from "react";
import axios from "axios";

const crudLink = 'https://crudcrud.com/api/62280d54ef3a4b79886c820e41aa3fbe/cartItems'


const StoreContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

function StoreContextProvider(props) {
  // const initialToken = localStorage.getItem("token");
  // const [token, setToken] = useState(initialToken);
  // const userIsLoggedIn = !!token;
  const [token, setToken] = useState(null);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  useEffect(() => {
    const initialToken = localStorage.getItem("token");
    setToken(initialToken);
    setUserIsLoggedIn(!!initialToken);
  }, []);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    setUserIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUserIsLoggedIn(false);
  };

  useEffect(() => {
    if (userIsLoggedIn) {
      const loginTime = Date.now();
      localStorage.setItem("loginTime", loginTime);

      const checkInactive = () => {
        const currentTime = Date.now();
        const loginTime = localStorage.getItem("loginTime");
        const inactiveTime = currentTime - loginTime;
        const minutesInactive = Math.floor(inactiveTime / 1000 / 60);

        if (minutesInactive >= 5) {
          logoutHandler();
          // Redirect to the logout page
        }
      };

      const timer = setInterval(checkInactive, 1000);

      return () => clearInterval(timer);
    }
  }, [userIsLoggedIn]);
  // console.log("userIsLoggedIn" + userIsLoggedIn)
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  const [storeItems, setStoreItems] = useState([]);

function addToCart(newItem) {
  const existingItem = storeItems.find((item) => item.id === newItem.id);
  if (existingItem) {
    // if the item already exists, update its quantity
    const updatedItems = storeItems.map((item) =>
      item.id === existingItem.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setStoreItems(updatedItems);
    

  } else {
    // if the item doesn't exist, add it to the cart with quantity 1
    setStoreItems((prevItems) => [...prevItems, { ...newItem, quantity: 1}]);

  }
  
}

function clearItem(itemId) {
  const itemIndex = storeItems.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    // remove the item from the cart
    const updatedItems = [...storeItems];
    updatedItems.splice(itemIndex, 1);
    setStoreItems(updatedItems);
  }
  
}
function saveCartItems(cartItems) {
  axios.post(crudLink, { cartItems })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}
useEffect(() => {
  saveCartItems(storeItems);
}, [storeItems]);

useEffect(() => {
  if (!userIsLoggedIn) {
    saveCartItems([]);
  }
}, [userIsLoggedIn]);



  return (
    <StoreContext.Provider
      value={{ storeItems, addToCart, clearItem, contextValue }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}

export { StoreContextProvider, StoreContext };
