import React from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaArrowLeft, FaCreditCard } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Cart = () => {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      showToast('Item removed from cart', 'info');
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    showToast('Item removed from cart', 'info');
  };

  const handleClearCart = () => {
    clearCart();
    showToast('Cart cleared', 'info');
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      showToast('Please login to checkout', 'warning');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (totalItems === 0) {
    return (
      <div style={{ backgroundColor: colors.primary, minHeight: '100vh', padding: '20px 0' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <Card 
                className="border-0 shadow"
                style={{ backgroundColor: colors.secondary }}
              >
                <Card.Body className="py-5">
                  <FaShoppingCart className="text-muted fa-3x mb-3" />
                  <h3 style={{ color: colors.text }}>Your cart is empty</h3>
                  <p 
                    className="mb-4"
                    style={{ color: colors.textSecondary }}
                  >
                    Looks like you haven't added any items to your cart yet.
                  </p>
                  <Button 
                    as={Link} 
                    to="/products" 
                    variant="primary" 
                    size="lg"
                  >
                    Start Shopping
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: colors.primary, minHeight: '100vh', padding: '20px 0' }}>
      <Container>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h1 style={{ color: colors.text }}>Shopping Cart</h1>
              <Button
                variant="outline-secondary"
                as={Link}
                to="/products"
                className="d-flex align-items-center gap-2"
              >
                <FaArrowLeft /> Continue Shopping
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          {/* Cart Items */}
          <Col lg={8} className="mb-4">
            <Card 
              className="border-0 shadow"
              style={{ backgroundColor: colors.secondary }}
            >
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0" style={{ color: colors.text }}>
                  Cart Items ({totalItems})
                </h5>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
              </Card.Header>
              <Card.Body>
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className="d-flex align-items-center border-bottom pb-3 mb-3"
                    style={{ borderColor: colors.secondary }}
                  >
                    {/* Product Image */}
                    <div className="me-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow-1 me-3">
                      <h6 className="mb-1" style={{ color: colors.text }}>
                        {item.name}
                      </h6>
                      <p 
                        className="mb-0 small"
                        style={{ color: colors.textSecondary }}
                      >
                        ${item.price} each
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="me-3">
                      <Form.Group className="d-flex align-items-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <Form.Control
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          style={{ 
                            width: '60px', 
                            textAlign: 'center',
                            margin: '0 8px'
                          }}
                        />
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </Form.Group>
                    </div>

                    {/* Item Total */}
                    <div className="me-3 text-end">
                      <strong style={{ color: colors.text }}>
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </strong>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* Cart Summary */}
          <Col lg={4}>
            <Card 
              className="border-0 shadow sticky-top"
              style={{ backgroundColor: colors.secondary, top: '20px' }}
            >
              <Card.Header>
                <h5 className="mb-0" style={{ color: colors.text }}>
                  Order Summary
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: colors.textSecondary }}>Items ({totalItems}):</span>
                  <span style={{ color: colors.text }}>${totalPrice}</span>
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between mb-3">
                  <strong style={{ color: colors.text }}>Total:</strong>
                  <strong style={{ color: colors.text }}>${totalPrice}</strong>
                </div>

                <div className="d-grid gap-2">
                  <Button
                    variant="success"
                    size="lg"
                    onClick={handleCheckout}
                    className="d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaCreditCard /> Checkout
                  </Button>
                  
                  <Button
                    variant="outline-primary"
                    as={Link}
                    to="/products"
                    className="d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaArrowLeft /> Continue Shopping
                  </Button>
                </div>

                {!isAuthenticated && (
                  <Alert variant="warning" className="mt-3">
                    <small>
                      Please <Link to="/login">login</Link> to proceed with checkout.
                    </small>
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart; 