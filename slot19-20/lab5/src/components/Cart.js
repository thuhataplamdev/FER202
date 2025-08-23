import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalValue } =
    useContext(CartContext);
  const [paidMsg, setPaidMsg] = useState("");

  const handleCheckout = () => {
    if (!cartItems.length) return;
    if (window.confirm("Xác nhận đặt hàng và thanh toán?")) {
      clearCart();
      setPaidMsg("Thanh toán thành công! Cảm ơn bạn đã đặt hàng.");
      setTimeout(() => setPaidMsg(""), 3000);
    }
  };

  return (
    <div className="cart">
      <h2>Giỏ hàng</h2>

      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((i) => (
              <li key={i.id} className="cart-item">
                <div>
                  <strong>{i.name}</strong> — ${parseFloat(i.price).toFixed(2)}
                </div>
                <button className="link danger" onClick={() => removeFromCart(i.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>Tổng số món: {cartItems.length}</p>
            <p>Tổng giá trị: ${totalValue}</p>
            <div className="cart-actions">
              <button className="secondary" onClick={clearCart}>Clear Cart</button>
              <button className="primary" onClick={handleCheckout}>Xác nhận đơn hàng</button>
            </div>
          </div>
        </>
      )}

      {paidMsg && <div className="app-toast success">{paidMsg}</div>}
    </div>
  );
};

export default Cart;
