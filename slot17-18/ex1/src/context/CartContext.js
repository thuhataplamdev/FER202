import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Thêm món vào giỏ
  const addToCart = (dish) => {
    setCartItems((prev) => [...prev, dish]);
  };

  // Xoá 1 món theo id
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Xoá toàn bộ giỏ
  const clearCart = () => setCartItems([]);

  // Tổng tiền
  const totalValue = cartItems
    .reduce((acc, item) => acc + parseFloat(item.price), 0)
    .toFixed(2);

  // Load từ localStorage khi mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cartItems"));
      if (Array.isArray(saved)) setCartItems(saved);
    } catch {}
  }, []);

  // Lưu mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalValue }}
    >
      {children}
    </CartContext.Provider>
  );
};
