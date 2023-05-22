import { createContext, useContext, useEffect, useState } from 'react';
import { LOCAL_STORAGE } from '../Constants';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [countGames, setCountGames] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE.CART_GAME);
    const json = JSON.parse(data);
    if (json) {
      setCountGames(json.length);
    }
  }, []);

  const deleteItem = () => {
    setCountGames((prev) => prev - 1);
  };

  const addItem = () => {
    setCountGames((prev) => prev + 1);
  };

  const clearCart = () => {
    setCountGames(0);
  };

  return (
    <CartContext.Provider
      value={{ countGames, deleteItem, addItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
