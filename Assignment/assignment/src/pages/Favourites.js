import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useFavourites } from '../context/FavouritesContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Favourites = () => {
  const { colors } = useTheme();
  const { items, totalItems, removeFromFavourites, clearFavourites } = useFavourites();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast('Added to cart', 'success');
  };

  const handleRemoveFromFavourites = (productId) => {
    removeFromFavourites(productId);
    showToast('Removed from favourites', 'info');
  };

  const handleClearFavourites = () => {
    clearFavourites();
    showToast('All favourites cleared', 'info');
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
                  <FaHeart className="text-muted fa-3x mb-3" />
                  <h3 style={{ color: colors.text }}>No favourites yet</h3>
                  <p 
                    className="mb-4"
                    style={{ color: colors.textSecondary }}
                  >
                    You haven't added any products to your favourites yet.
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
              <h1 style={{ color: colors.text }}>
                My Favourites ({totalItems})
              </h1>
              <div className="d-flex gap-2">
                <Button
                  variant="outline-danger"
                  onClick={handleClearFavourites}
                  className="d-flex align-items-center gap-2"
                >
                  <FaTrash /> Clear All
                </Button>
                <Button
                  variant="outline-secondary"
                  as={Link}
                  to="/products"
                  className="d-flex align-items-center gap-2"
                >
                  <FaArrowLeft /> Continue Shopping
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Favourites Grid */}
        <Row className="g-4">
          {items.map(product => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card 
                className="h-100 product-card border-0 shadow"
                style={{ backgroundColor: colors.secondary }}
              >
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveFromFavourites(product.id)}
                      className="rounded-circle"
                      style={{ width: '32px', height: '32px', padding: 0 }}
                    >
                      <FaTrash size={12} />
                    </Button>
                  </div>
                  <div className="position-absolute top-0 start-0 m-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="rounded-circle"
                      style={{ width: '32px', height: '32px', padding: 0 }}
                    >
                      <FaShoppingCart size={12} />
                    </Button>
                  </div>
                </div>
                
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="h6 mb-2" style={{ color: colors.text }}>
                    {product.name}
                  </Card.Title>
                  
                  <div className="mb-2 d-flex align-items-center">
                    <FaHeart className="text-danger me-1" />
                    <small style={{ color: colors.textSecondary }}>
                      {product.rating} ({product.reviews} reviews)
                    </small>
                  </div>
                  
                  <Card.Text 
                    className="small mb-3 flex-grow-1"
                    style={{ color: colors.textSecondary }}
                  >
                    {product.description}
                  </Card.Text>
                  
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <strong style={{ color: colors.text }}>
                        ${product.price}
                      </strong>
                      <Badge bg="success">Favourite</Badge>
                    </div>
                    
                    <div className="d-grid gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        as={Link}
                        to={`/products/${product.id}`}
                        className="d-flex align-items-center justify-content-center gap-1"
                      >
                        View Details
                      </Button>
                      
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="d-flex align-items-center justify-content-center gap-1"
                      >
                        <FaShoppingCart /> Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Summary Card */}
        <Row className="mt-5">
          <Col>
            <Card 
              className="border-0 shadow text-center"
              style={{ backgroundColor: colors.secondary }}
            >
              <Card.Body className="py-4">
                <h4 style={{ color: colors.text }}>
                  You have {totalItems} favourite product{totalItems !== 1 ? 's' : ''}
                </h4>
                <p 
                  className="mb-3"
                  style={{ color: colors.textSecondary }}
                >
                  Keep track of your favourite recipes and add them to cart whenever you're ready to cook!
                </p>
                <div className="d-flex gap-3 justify-content-center">
                  <Button
                    variant="primary"
                    as={Link}
                    to="/products"
                    className="d-flex align-items-center gap-2"
                  >
                    <FaArrowLeft /> Browse More Products
                  </Button>
                  <Button
                    variant="outline-primary"
                    as={Link}
                    to="/cart"
                    className="d-flex align-items-center gap-2"
                  >
                    <FaShoppingCart /> View Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Favourites; 