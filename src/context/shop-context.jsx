import React, { createContext, useState } from "react";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [cartItemsData, setCartItemsData] = useState({});

  const addToCart = (itemId, data) => {
    if (cartItems[itemId]) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: cartItems[itemId] + 1,
      }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: 1,
      }));
    }

    if (data) {
      setCartItemsData((prev) => {
        return { ...prev, [itemId]: data };
      });
    }
  };

  const removeFromCart = (itemId) => {
    if (cartItems[itemId] && cartItems[itemId] > 1) {
      setCartItems((prev) => ({ ...prev, [itemId]: cartItems[itemId] - 1 }));
    }

    if (cartItems[itemId] && cartItems[itemId] === 1) {
      console.log("zamn");
      setCartItems((prev) => {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      });
    }
  };

  const changeItemAmount = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCartItems((prev) => ({ ...prev, [name]: value }));
  };

  const totalPrice = (inventory, priceData) => {
    let finalPrice = 0;
    for (const product in inventory) {
      if (priceData[product]) {
        finalPrice += inventory[product] * priceData[product].price;
      }
    }
    return finalPrice;
  };

  const contextValue = {
    cartItems,
    cartItemsData,
    addToCart,
    removeFromCart,
    changeItemAmount,
    totalPrice,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
