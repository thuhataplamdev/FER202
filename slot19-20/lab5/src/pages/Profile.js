import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaEdit, FaSignOutAlt, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';

const Profile = () => {
  const { colors } = useTheme();
  const { user, logout } = useAuth();
  const { totalItems: cartItems } = useCart();
  const { totalItems: favouritesCount } = useFavourites();

  if (!user) {
    return null;
  }

  return (
    <div style={{ backgroundColor: colors.primary, minHeight: '100vh', padding: '20px 0' }}>
      <Container>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 style={{ color: colors.text }}>My Profile</h1>
          </Col>
        </Row>

        <Row>
          {/* Profile Information */}
          <Col lg={8} className="mb-4">
            <Card 
              className="border-0 shadow"
              style={{ backgroundColor: colors.secondary }}
            >
              <Card.Header className="d-flex align-items-center gap-3">
                <FaUser className="text-primary" />
                <h4 className="mb-0" style={{ color: colors.text }}>
                  Personal Information
                </h4>
              </Card.Header>
              <Card.Body className="p-4">
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="fw-bold" style={{ color: colors.textSecondary }}>
                        First Name:
                      </label>
                      <p style={{ color: colors.text }}>{user.firstName || 'N/A'}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="fw-bold" style={{ color: colors.textSecondary }}>
                        Last Name:
                      </label>
                      <p style={{ color: colors.text }}>{user.lastName || 'N/A'}</p>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="fw-bold" style={{ color: colors.textSecondary }}>
                        Email:
                      </label>
                      <p style={{ color: colors.text }}>{user.email}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="fw-bold" style={{ color: colors.textSecondary }}>
                        Phone:
                      </label>
                      <p style={{ color: colors.text }}>{user.phone || 'N/A'}</p>
                    </div>
                  </Col>
                </Row>

                <div className="mb-3">
                  <label className="fw-bold" style={{ color: colors.textSecondary }}>
                    Address:
                  </label>
                  <p style={{ color: colors.text }}>
                    {user.address ? (
                      <>
                        {user.address}<br />
                        {user.city && `${user.city}, `}
                        {user.zipCode && `${user.zipCode}`}<br />
                        {user.country && user.country}
                      </>
                    ) : (
                      'N/A'
                    )}
                  </p>
                </div>

                <div className="mt-4">
                  <Button
                    variant="outline-primary"
                    className="d-flex align-items-center gap-2"
                  >
                    <FaEdit /> Edit Profile
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Quick Stats */}
          <Col lg={4}>
            <Card 
              className="border-0 shadow mb-4"
              style={{ backgroundColor: colors.secondary }}
            >
              <Card.Header>
                <h5 className="mb-0" style={{ color: colors.text }}>
                  Account Summary
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span style={{ color: colors.textSecondary }}>Member since:</span>
                  <Badge bg="info">
                    {new Date(user.id).toLocaleDateString()}
                  </Badge>
                </div>
                
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span style={{ color: colors.textSecondary }}>Cart items:</span>
                  <Badge bg="success">{cartItems}</Badge>
                </div>
                
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span style={{ color: colors.textSecondary }}>Favourites:</span>
                  <Badge bg="warning" text="dark">{favouritesCount}</Badge>
                </div>
              </Card.Body>
            </Card>

            <Card 
              className="border-0 shadow"
              style={{ backgroundColor: colors.secondary }}
            >
              <Card.Header>
                <h5 className="mb-0" style={{ color: colors.text }}>
                  Quick Actions
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Button
                    variant="outline-primary"
                    as={Link}
                    to="/favourites"
                    className="d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaHeart /> My Favourites
                  </Button>
                  
                  <Button
                    variant="outline-success"
                    as={Link}
                    to="/cart"
                    className="d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaShoppingCart /> Shopping Cart
                  </Button>
                  
                  <Button
                    variant="outline-danger"
                    onClick={logout}
                    className="d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaSignOutAlt /> Sign Out
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Activity */}
        <Row className="mt-4">
          <Col>
            <Card 
              className="border-0 shadow"
              style={{ backgroundColor: colors.secondary }}
            >
              <Card.Header>
                <h5 className="mb-0" style={{ color: colors.text }}>
                  Recent Activity
                </h5>
              </Card.Header>
              <Card.Body>
                <p 
                  className="text-center text-muted py-4"
                  style={{ color: colors.textSecondary }}
                >
                  No recent activity to display.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile; 