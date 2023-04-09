import React, {useState, useEffect} from "react";

const StoreContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
})

// function StoreContextProvider (props) {
  
//   const initialToken = localStorage.getItem("token");
//   const [token, setToken] = useState(initialToken);
//   const userIsLoggedIn = !!token;
  

//   const loginHandler = (token) => {
//     setToken(token);
//     localStorage.setItem("token", token);
//   };

//   const logoutHandler = () => {
//     setToken(null);
//     localStorage.removeItem("token");
    
//   };

//   useEffect(() => {
//     if (userIsLoggedIn) {
//       const loginTime = Date.now();
//       localStorage.setItem("loginTime", loginTime);

//       const checkInactive = () => {
//         const currentTime = Date.now();
//         const loginTime = localStorage.getItem("loginTime");
//         const inactiveTime = currentTime - loginTime;
//         const minutesInactive = Math.floor(inactiveTime / 1000 / 60);

//         if (minutesInactive >= 5) {
//           logoutHandler();
//            // Redirect to the logout page
//         }
//       };

//       const timer = setInterval(checkInactive, 1000);

//       return () => clearInterval(timer);
//     }
//   }, [userIsLoggedIn]);

//   const contextValue = {
//     token: token,
//     isLoggedIn: userIsLoggedIn,
//     login: loginHandler,
//     logout: logoutHandler,
//   };

//     const [storeItems, setStoreItems] = useState([])
//     function addToCart(newItem){
//         const existingItem = storeItems.find((item) => item.id === newItem.id);
//     if (existingItem) {
//       // if the item already exists, update its quantity
//       const updatedItems = storeItems.map((item) =>
//         item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
//       );
//       setStoreItems(updatedItems);
//     } else {
//       // if the item doesn't exist, add it to the cart with quantity 1
//       setStoreItems((prevItems) => [...prevItems, { ...newItem, quantity: 1 }]);
//     }
//     }
//     return(
//         <StoreContext.Provider value={{storeItems, addToCart, contextValue}}>
//             {props.children}
//         </StoreContext.Provider>
//     )
// }
function StoreContextProvider(props) {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialToken);
  const [storeItems, setStoreItems] = useState([]);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    setIsLoggedIn(true); // set isLoggedIn to true after successful login
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    setIsLoggedIn(false); // set isLoggedIn to false after logout
  };

  useEffect(() => {
    if (isLoggedIn) {
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
  }, [isLoggedIn]);

  function addToCart(newItem) {
    const existingItem = storeItems.find((item) => item.id === newItem.id);
    if (existingItem) {
      // if the item already exists, update its quantity
      const updatedItems = storeItems.map((item) =>
        item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setStoreItems(updatedItems);
    } else {
      // if the item doesn't exist, add it to the cart with quantity 1
      setStoreItems((prevItems) => [...prevItems, { ...newItem, quantity: 1 }]);
    }
  }

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <StoreContext.Provider value={{ storeItems, addToCart, contextValue }}>
      {props.children}
    </StoreContext.Provider>
  );
}


export {StoreContextProvider, StoreContext}