import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaLock, FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: user?.address || '',
    billingCity: user?.city || '',
    billingZipCode: user?.zipCode || '',
    billingCountry: user?.country || ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!formData.cardName) {
      newErrors.cardName = 'Cardholder name is required';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please use MM/YY format';
    }

    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3-4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart after successful checkout
      clearCart();
      showToast('Order placed successfully! Thank you for your purchase.', 'success');
      navigate('/');
    } catch (error) {
      showToast('Checkout failed. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ backgroundColor: colors.primary, minHeight: '100vh', padding: '20px 0' }}>
        <Container>
          <Alert variant="info">
            <Alert.Heading>Your cart is empty</Alert.Heading>
            <p>You need to add items to your cart before proceeding to checkout.</p>
            <Button variant="primary" onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
          </Alert>
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
              <h1 style={{ color: colors.text }}>Checkout</h1>
              <Button
                variant="outline-secondary"
                onClick={() => navigate('/cart')}
                className="d-flex align-items-center gap-2"
              >
                <FaArrowLeft /> Back to Cart
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          {/* Checkout Form */}
          <Col lg={8} className="mb-4">
            <Card 
              className="border-0 shadow"
              style={{ backgroundColor: colors.secondary }}
            >
              <Card.Header className="d-flex align-items-center gap-3">
                <FaCreditCard className="text-primary" />
                <h4 className="mb-0" style={{ color: colors.text }}>
                  Payment Information
                </h4>
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: colors.text }}>Card Number *</Form.Label>
                        <Form.Control
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          isInvalid={!!errors.cardNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cardNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: colors.text }}>Cardholder Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          isInvalid={!!errors.cardName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cardName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: colors.text }}>Expiry Date *</Form.Label>
                        <Form.Control
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          isInvalid={!!errors.expiryDate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.expiryDate}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: colors.text }}>CVV *</Form.Label>
                        <Form.Control
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          maxLength="4"
                          isInvalid={!!errors.cvv}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cvv}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    
                    <Col md={4}>
                      <div className="d-flex align-items-end h-100">
                        <div className="text-muted">
                          <small>
                            <FaLock className="me-1" />
                            Secure payment
                          </small>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <hr className="my-4" />

                  <h5 style={{ color: colors.text }}>Billing Address</h5>
                  
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: colors.text }}>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleChange}
                      placeholder="Enter billing address"
                    />
                  </Form.Group>

                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: colors.text }}>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="billingCity"
                          value={formData.billingCity}
                          onChange={handleChange}
                          placeholder="Enter city"
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: colors.text }}>Zip Code</Form.Label>
                        <Form.Control
                          type="text"
                          name="billingZipCode"
                          value={formData.billingZipCode}
                          onChange={handleChange}
                          placeholder="Enter zip code"
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: colors.text }}>Country</Form.Label>
                        <Form.Select
                          name="billingCountry"
                          value={formData.billingCountry}
                          onChange={handleChange}
                        >
                          <option value="">Select country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="JP">Japan</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="mt-4">
                    <Button
                      type="submit"
                      variant="success"
                      size="lg"
                      className="w-100"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <FaLock className="me-2" />
                          Complete Order (${totalPrice})
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Order Summary */}
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
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className="d-flex justify-content-between align-items-center mb-2"
                  >
                    <div>
                      <small style={{ color: colors.text }}>
                        {item.name} x {item.quantity}
                      </small>
                    </div>
                    <small style={{ color: colors.text }}>
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </small>
                  </div>
                ))}
                
                <hr />
                
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: colors.textSecondary }}>Subtotal:</span>
                  <span style={{ color: colors.text }}>${totalPrice}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: colors.textSecondary }}>Tax:</span>
                  <span style={{ color: colors.text }}>$0.00</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: colors.textSecondary }}>Shipping:</span>
                  <span style={{ color: colors.text }}>$0.00</span>
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between mb-3">
                  <strong style={{ color: colors.text }}>Total:</strong>
                  <strong style={{ color: colors.text }}>${totalPrice}</strong>
                </div>

                <Alert variant="info" className="small">
                  <strong>Secure Checkout:</strong> Your payment information is encrypted and secure.
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Checkout; 