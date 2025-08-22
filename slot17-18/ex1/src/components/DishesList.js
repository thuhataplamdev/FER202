import React, { useContext, useMemo, useState } from "react";
import { CartContext } from "../context/CartContext";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DishesList = ({ dishes, searchTerm = "" }) => {
  const { addToCart } = useContext(CartContext);
  const [toastMsg, setToastMsg] = useState("");

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
    setToastMsg(`${dish.name} đã được thêm vào giỏ hàng!`);
    setTimeout(() => setToastMsg(""), 2000);
  };

  return (
    <div>
      <h2 className="text-center my-4">Danh sách món ăn</h2>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4 dishes">
        {filtered.map((dish) => (
          <Col key={dish.id}>
            <Card className="h-100 shadow-sm dish-card">
              <Card.Img
                variant="top"
                src={dish.image}
                alt={dish.name}
                className="dish-card-img"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-5">{dish.name}</Card.Title>
                <Card.Text className="text-muted flex-grow-1">
                  {dish.description}
                </Card.Text>
                <Card.Text className="fw-bold text-success mb-3">
                  Price: ${parseFloat(dish.price).toFixed(2)}
                </Card.Text>
                <Button variant="success" onClick={() => handleAdd(dish)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {filtered.length === 0 && (
          <Col>
            <div className="empty text-center">Không tìm thấy món phù hợp.</div>
          </Col>
        )}
      </Row>

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
