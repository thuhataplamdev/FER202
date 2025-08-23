import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaSearch, FaFilter, FaSort } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { useTheme } from '../context/ThemeContext';
import products from '../data/products';

const Products = () => {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return uniqueCategories;
  }, []);

  // Memoized filtered and sorted products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'price':
          aValue = parseFloat(a.price);
          bValue = parseFloat(b.price);
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'reviews':
          aValue = a.reviews;
          bValue = b.reviews;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, sortOrder]);

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('name');
    setSortOrder('asc');
  };

  return (
    <div style={{ backgroundColor: colors.primary, minHeight: '100vh', padding: '20px 0' }}>
      <Container>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 
              className="text-center mb-3"
              style={{ color: colors.text }}
            >
              Our Products
            </h1>
            <p 
              className="text-center mb-4"
              style={{ color: colors.textSecondary }}
            >
              Discover our collection of delicious and healthy recipes
            </p>
          </Col>
        </Row>

        {/* Filters and Search */}
        <Card 
          className="mb-4 border-0 shadow-sm"
          style={{ backgroundColor: colors.secondary }}
        >
          <Card.Body>
            <Row className="g-3">
              {/* Search */}
              <Col md={4}>
                <div className="position-relative">
                  <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
                  <Form.Control
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </Col>

              {/* Category Filter */}
              <Col md={3}>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              {/* Sort Options */}
              <Col md={3}>
                <div className="d-flex gap-2">
                  <Button
                    variant={sortBy === 'name' ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => handleSortChange('name')}
                  >
                    <FaSort className="me-1" />
                    Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </Button>
                  <Button
                    variant={sortBy === 'price' ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => handleSortChange('price')}
                  >
                    <FaSort className="me-1" />
                    Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </Button>
                </div>
              </Col>

              {/* Clear Filters */}
              <Col md={2}>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={clearFilters}
                  className="w-100"
                >
                  Clear
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Results Count */}
        <Row className="mb-3">
          <Col>
            <p 
              className="mb-0"
              style={{ color: colors.textSecondary }}
            >
              Showing {filteredAndSortedProducts.length} of {products.length} products
            </p>
          </Col>
        </Row>

        {/* Products Grid */}
        <Row className="g-4">
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map(product => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <Card 
                className="border-0"
                style={{ backgroundColor: colors.secondary }}
              >
                <Card.Body className="py-5">
                  <h4 style={{ color: colors.text }}>No products found</h4>
                  <p style={{ color: colors.textSecondary }}>
                    Try adjusting your search criteria or filters.
                  </p>
                  <Button variant="primary" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Products; 