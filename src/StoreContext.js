import React, { useState, useEffect } from "react";
// import axios from "axios";

// const crudLink = 'https://crudcrud.com/api/7d0208a938e944d9a4074883876d2059/cartItems'


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

  //localStorage implementation:

  function addToCart(item) {
    const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingCartItem = existingCartItems.find(cartItem => cartItem.id === item.id);
  
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      existingCartItems.push({...item, quantity: 1});
    }
  
    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
    setStoreItems(existingCartItems);
    window.location.reload(false)
  }
  

  function clearItem(itemId) {
    const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemIndex = existingCartItems.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      // remove the item from the cart
      const updatedItems = [...existingCartItems];
      updatedItems.splice(itemIndex, 1);
      setStoreItems(updatedItems);
  
      // update the item in localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      window.location.reload(false)
    }
  }
  
  
useEffect(() => {
  const storedItems = localStorage.getItem("storeItems");
  if (storedItems) {
    setStoreItems(JSON.parse(storedItems));
  }
}, []);

// function addToCart(item) {
//   const existingCartItems = [...storeItems];
//   const existingCartItem = existingCartItems.find(cartItem => cartItem.id === item.id);

//   if (existingCartItem) {
//     existingCartItem.quantity += 1;
//   } else {
//     existingCartItems.push({...item, quantity: 1});
//   }

//   setStoreItems(existingCartItems);
//   axios.post(crudLink, existingCartItems)
//     .then(response => {
//       console.log(response);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// function clearItem(itemId) {
//   const existingCartItems = [...storeItems];
//   const itemIndex = existingCartItems.findIndex((item) => item.id === itemId);
//   if (itemIndex !== -1) {
//     // remove the item from the cart
//     const updatedItems = [...existingCartItems];
//     updatedItems.splice(itemIndex, 1);
//     setStoreItems(updatedItems);

//     // update the item in the server
//     axios.delete(`${crudLink}/${itemId}`)
//       .then(response => {
//         console.log(response);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
// }

// useEffect(() => {
//   axios.get(crudLink)
//     .then(response => {
//       setStoreItems(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }, []);

  return (
    <StoreContext.Provider
      value={{ storeItems, addToCart, clearItem, contextValue }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}

export { StoreContextProvider, StoreContext };
