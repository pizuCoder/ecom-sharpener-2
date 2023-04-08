import React, {useState} from "react";
const StoreContext = React.createContext()

function StoreContextProvider (props) {
    const [storeItems, setStoreItems] = useState([])
    function addToCart(newItem){
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
    return(
        <StoreContext.Provider value={{storeItems, addToCart}}>
            {props.children}
        </StoreContext.Provider>
    )
}

export {StoreContextProvider, StoreContext}