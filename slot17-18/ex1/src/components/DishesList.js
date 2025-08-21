import React, { useContext, useMemo, useState } from "react";
import { CartContext } from "../context/CartContext";
import PropTypes from "prop-types";

const DishesList = ({ dishes, searchTerm = "" }) => {
  const { addToCart } = useContext(CartContext);
  const [toastMsg, setToastMsg] = useState("");

  // Lọc món theo search term
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return dishes;
    return dishes.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
    );
  }, [dishes, searchTerm]);

  const handleAdd = (dish) => {
    addToCart(dish);
    setToastMsg(`✅ ${dish.name} đã được thêm vào giỏ hàng!`);
    setTimeout(() => setToastMsg(""), 2000);
  };

  return (
    <div>
      <h2>Danh sách món ăn</h2>
      <div className="dishes">
        {filtered.map((dish) => (
          <div key={dish.id} className="dish-item">
            <img src={dish.image} alt={dish.name} />
            <h3>{dish.name}</h3>
            <p className="muted">{dish.description}</p>
            <p className="price">Price: ${parseFloat(dish.price).toFixed(2)}</p>
            <button onClick={() => handleAdd(dish)}>Add to Cart</button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty">Không tìm thấy món phù hợp.</div>
        )}
      </div>

      {/* Hiển thị toast nếu có message */}
      {toastMsg && <div className="app-toast success">{toastMsg}</div>}
    </div>
  );
};

DishesList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  searchTerm: PropTypes.string,
};

export default DishesList;
