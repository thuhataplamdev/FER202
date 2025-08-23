import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { FaStar, FaHeart, FaShoppingCart, FaArrowLeft, FaEye } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';
import { useToast } from '../context/ToastContext';
import products from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { addToCart } = useCart();
  const { addToFavourites, isInFavourites } = useFavourites();
  const { showToast } = useToast();

  // Find the product by ID
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Product Not Found</Alert.Heading>
          <p>The product you're looking for doesn't exist.</p>
          <Button as={Link} to="/products" variant="primary">
            Back to Products
          </Button>
        </Alert>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    showToast('Added to cart', 'success');
  };

  const handleAddToFavourites = () => {
    if (isInFavourites(product.id)) {
      showToast('Already in favourites', 'info');
      return;
    }
    addToFavourites(product);
    showToast('Added to favourites', 'success');
  };

  const isFavourite = isInFavourites(product.id);

  return (
    <div style={{ backgroundColor: colors.primary, minHeight: '100vh', padding: '20px 0' }}>
      <Container>
        {/* Back Button */}
        <Row className="mb-4">
          <Col>
            <Button
              variant="outline-secondary"
              onClick={() => navigate('/products')}
              className="d-flex align-items-center gap-2"
            >
              <FaArrowLeft /> Back to List
            </Button>
          </Col>
        </Row>

        <Row>
          {/* Product Image */}
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </Card>
          </Col>

          {/* Product Details */}
          <Col lg={6}>
            <Card 
              className="border-0 shadow h-100"
              style={{ backgroundColor: colors.secondary }}
            >
              <Card.Body className="p-4">
                {/* Product Header */}
                <div className="mb-3">
                  <h1 
                    className="h2 mb-2"
                    style={{ color: colors.text }}
                  >
                    {product.name}
                  </h1>
                  
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="d-flex align-items-center">
                      <FaStar className="text-warning me-1" />
                      <span style={{ color: colors.text }}>
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                    <Badge bg="success" className="fs-6">
                      ${product.price}
                    </Badge>
                  </div>
                </div>

                {/* Product Description */}
                <div className="mb-4">
                  <h5 style={{ color: colors.text }}>Description</h5>
                  <p 
                    className="mb-0"
                    style={{ color: colors.textSecondary }}
                  >
                    {product.description}
                  </p>
                </div>

                {/* Product Category */}
                <div className="mb-4">
                  <h5 style={{ color: colors.text }}>Category</h5>
                  <Badge 
                    bg="info" 
                    className="text-capitalize"
                  >
                    {product.category}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="d-grid gap-3">
                  <Button
                    variant="success"
                    size="lg"
                    onClick={handleAddToCart}
                    className="d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaShoppingCart /> Add to Cart
                  </Button>
                  
                  <Button
                    variant={isFavourite ? "warning" : "outline-warning"}
                    size="lg"
                    onClick={handleAddToFavourites}
                    className="d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaHeart /> 
                    {isFavourite ? ' Browse to My Favourites' : ' Add to Favourite'}
                  </Button>
                  
                  <Button
                    variant="outline-primary"
                    size="lg"
                    as={Link}
                    to="/products"
                    className="d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaArrowLeft /> Back to List
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Additional Information */}
        <Row className="mt-5">
          <Col>
            <Card 
              className="border-0 shadow"
              style={{ backgroundColor: colors.secondary }}
            >
              <Card.Body className="p-4">
                <h3 
                  className="mb-4"
                  style={{ color: colors.text }}
                >
                  Product Features
                </h3>
                
                <Row className="g-4">
                  <Col md={4}>
                    <div className="text-center">
                      <div className="mb-2">
                        <FaStar className="text-warning fa-2x" />
                      </div>
                      <h5 style={{ color: colors.text }}>High Quality</h5>
                      <p 
                        className="small"
                        style={{ color: colors.textSecondary }}
                      >
                        Made with premium ingredients and care
                      </p>
                    </div>
                  </Col>
                  
                  <Col md={4}>
                    <div className="text-center">
                      <div className="mb-2">
                        <FaEye className="text-primary fa-2x" />
                      </div>
                      <h5 style={{ color: colors.text }}>Easy to Make</h5>
                      <p 
                        className="small"
                        style={{ color: colors.textSecondary }}
                      >
                        Simple steps for delicious results
                      </p>
                    </div>
                  </Col>
                  
                  <Col md={4}>
                    <div className="text-center">
                      <div className="mb-2">
                        <FaHeart className="text-danger fa-2x" />
                      </div>
                      <h5 style={{ color: colors.text }}>Healthy Choice</h5>
                      <p 
                        className="small"
                        style={{ color: colors.textSecondary }}
                      >
                        Nutritious and balanced meals
                      </p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail; 