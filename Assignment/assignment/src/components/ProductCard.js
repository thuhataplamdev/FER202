import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaStar, FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';
import { useToast } from '../context/ToastContext';

const ProductCard = ({ product }) => {
  const { colors } = useTheme();
  const { addToCart } = useCart();
  const { addToFavourites, isInFavourites } = useFavourites();
  const { showToast } = useToast();

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
    <Card 
      className="h-100 product-card"
      style={{ 
        backgroundColor: colors.primary,
        color: colors.text,
        border: `1px solid ${colors.secondary}`
      }}
    >
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <Badge 
          bg="success" 
          className="position-absolute top-0 end-0 m-2"
        >
          ${product.price}
        </Badge>
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6 mb-2" style={{ color: colors.text }}>
          {product.name}
        </Card.Title>
        
        <div className="mb-2 d-flex align-items-center">
          <FaStar className="text-warning me-1" />
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
          <div className="d-grid gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              as={Link}
              to={`/products/${product.id}`}
              className="d-flex align-items-center justify-content-center gap-1"
            >
              <FaEye /> View Details
            </Button>
            
            <Button
              variant="success"
              size="sm"
              onClick={handleAddToCart}
              className="d-flex align-items-center justify-content-center gap-1"
            >
              <FaShoppingCart /> Add to Cart
            </Button>
            
            <Button
              variant={isFavourite ? "warning" : "outline-warning"}
              size="sm"
              onClick={handleAddToFavourites}
              className="d-flex align-items-center justify-content-center gap-1"
            >
              <FaHeart /> 
              {isFavourite ? ' Browse to My Favourites' : ' Add to Favourite'}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard; 