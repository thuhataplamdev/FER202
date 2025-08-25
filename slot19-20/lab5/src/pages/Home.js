import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import products from  '../data/products';

const Home = () => {
  const { colors } = useTheme();

  const featured = [...products].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const truncate = (str, n = 100) => (str.length > n ? str.slice(0, n - 1) + '…' : str);

  return (
    <div style={{ backgroundColor: colors.primary, minHeight: '100vh' }}>
      {/* Hero Carousel */}
      <section className="mb-5">
        <Carousel className="rounded-xl shadow-sm" fade interval={4000} pause="hover">
          {featured.map((p) => (
            <Carousel.Item key={p.id}>
              <img
                className="d-block w-100"
                src={p.image}
                alt={p.name}
                style={{ maxHeight: 520, objectFit: 'cover' }}
              />
              <Carousel.Caption className="bg-dark bg-opacity-50 rounded px-3 py-2">
                <h3 className="mb-1">{p.name}</h3>
                <p className="mb-2">{`$${p.price} • ${truncate(p.description, 110)}`}</p>
                <Button as={Link} to="/products" variant="light" size="sm">
                  Browse Menu
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* Welcome Section */}
      <Container className="mb-5">
        <Row className="text-center">
          <Col>
            <h1
              className="display-4 mb-4"
              style={{ color: colors.text }}
            >
              Welcome to FoodHub
            </h1>
            <p
              className="lead mb-4"
              style={{ color: colors.textSecondary }}
            >
              Discover delicious, healthy meals prepared with fresh ingredients and love.
              From quick breakfasts to gourmet dinners, we have something for everyone.
            </p>
            <Button
              as={Link}
              to="/products"
              variant="primary"
              size="lg"
              className="px-4 py-2"
            >
              Explore Our Menu
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <Container className="mb-5">
        <Row className="g-4">
          <Col md={4}>
            <Card
              className="h-100 text-center border-0 shadow-sm"
              style={{ backgroundColor: colors.secondary }}
            >
              <Card.Body>
                <div className="mb-3">
                  <i className="fas fa-leaf fa-3x text-success"></i>
                </div>
                <Card.Title style={{ color: colors.text }}>
                  Fresh Ingredients
                </Card.Title>
                <Card.Text style={{ color: colors.textSecondary }}>
                  We use only the freshest, locally-sourced ingredients to ensure the best quality and taste.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              className="h-100 text-center border-0 shadow-sm"
              style={{ backgroundColor: colors.secondary }}
            >
              <Card.Body>
                <div className="mb-3">
                  <i className="fas fa-clock fa-3x text-primary"></i>
                </div>
                <Card.Title style={{ color: colors.text }}>
                  Quick & Easy
                </Card.Title>
                <Card.Text style={{ color: colors.textSecondary }}>
                  Most of our dishes can be prepared in under 30 minutes, perfect for busy weeknights.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              className="h-100 text-center border-0 shadow-sm"
              style={{ backgroundColor: colors.secondary }}
            >
              <Card.Body>
                <div className="mb-3">
                  <i className="fas fa-heart fa-3x text-danger"></i>
                </div>
                <Card.Title style={{ color: colors.text }}>
                  Healthy & Nutritious
                </Card.Title>
                <Card.Text style={{ color: colors.textSecondary }}>
                  Balanced meals packed with nutrients to fuel your body and satisfy your taste buds.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* CTA Section */}
      <Container className="mb-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <Card
              className="border-0 shadow"
              style={{ backgroundColor: colors.accent, color: 'white' }}
            >
              <Card.Body className="py-5">
                <h2 className="mb-3">Ready to Start Cooking?</h2>
                <p className="mb-4">
                  Join thousands of happy customers who have transformed their meals with our recipes.
                </p>
                <div className="d-flex gap-3 justify-content-center">
                  <Button
                    as={Link}
                    to="/register"
                    variant="light"
                    size="lg"
                  >
                    Get Started
                  </Button>
                  <Button
                    as={Link}
                    to="/products"
                    variant="outline-light"
                    size="lg"
                  >
                    Browse Menu
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

export default Home;
