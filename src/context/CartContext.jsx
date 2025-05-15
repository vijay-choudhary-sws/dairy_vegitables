import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const priceSum = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    setTotalItems(itemCount);
    setTotalPrice(Number(priceSum.toFixed(2)));
  }, [items]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
