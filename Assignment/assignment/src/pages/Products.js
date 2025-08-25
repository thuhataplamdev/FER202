import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaSearch, FaSort } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { useTheme } from '../context/ThemeContext';
import products from '../data/product.json';

const Products = () => {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name' = brand; có thể đổi 'title' nếu muốn
  const [sortOrder, setSortOrder] = useState('asc');

  // Lấy "category" từ brand (name) nếu không có category trong JSON
  const categories = useMemo(() => {
    const cats = products
      .map(p => p.category ?? p.name) // fallback sang brand
      .filter(Boolean);               // bỏ undefined/null
    return [...new Set(cats)];        // unique
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    // clone để không mutate mảng import
    let filtered = [...products];

    // Search (an toàn với undefined)
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(p => {
        const title = (p?.title ?? '').toLowerCase();
        const name  = (p?.name ?? '').toLowerCase();
        const desc  = (p?.description ?? '').toLowerCase();
        return title.includes(q) || name.includes(q) || desc.includes(q);
      });
    }

    // Filter by category/brand (so sánh với fallback)
    if (selectedCategory) {
      filtered = filtered.filter(p => (p?.category ?? p?.name) === selectedCategory);
    }

    // Sort (an toàn kiểu dữ liệu)
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'price':
          aValue = Number(a?.salePrice ?? a?.price ?? 0);
          bValue = Number(b?.salePrice ?? b?.price ?? 0);
          break;
        case 'title':
          aValue = (a?.title ?? '').toLowerCase();
          bValue = (b?.title ?? '').toLowerCase();
          break;
        case 'name': // brand
        default:
          aValue = (a?.name ?? '').toLowerCase();
          bValue = (b?.name ?? '').toLowerCase();
          break;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      // number compare
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, sortOrder]);

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
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
            <h1 className="text-center mb-3" style={{ color: colors.text }}>
              Our Products
            </h1>
          </Col>
        </Row>

        {/* Filters and Search */}
        <Card className="mb-4 border-0 shadow-sm" style={{ backgroundColor: colors.secondary }}>
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

              {/* sắp xếp theo bảng chữ cái*/}
              <Col md={3}>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Brands</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {String(cat)}
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
                    Brand {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </Button>
                  <Button
                    variant={sortBy === 'price' ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => handleSortChange('price')}
                  >
                    <FaSort className="me-1" />
                    Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </Button>
                    {/* Nếu muốn sort theo title (tên model), bật nút này:
                    <Button
                        variant={sortBy === 'title' ? 'primary' : 'outline-primary'}
                        size="sm"
                        onClick={() => handleSortChange('title')}
                    >
                        <FaSort className="me-1" />
                        Model {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </Button>
                    */}
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
            <p className="mb-0" style={{ color: colors.textSecondary }}>
              Showing {filteredAndSortedProducts.length} of {products.length} products
            </p>
          </Col>
        </Row>

        {/* Products Grid */}
        <Row className="g-4">
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map((product) => (
              <Col key={product?.id ?? Math.random()} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <Card className="border-0" style={{ backgroundColor: colors.secondary }}>
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
