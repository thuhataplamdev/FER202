import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown,Badge } from 'react-bootstrap';
import { FaShoppingCart, FaHeart, FaUser, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFavourites } from '../context/FavouritesContext';

const NavBar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const { totalItems: favouritesCount } = useFavourites();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <Navbar
      bg={isDarkMode ? 'dark' : 'light'}
      variant={isDarkMode ? 'dark' : 'light'}
      expand="lg"
      className="mb-3"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <strong>TechStore</strong>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
          </Nav>

          <Nav className="ms-auto d-flex align-items-center">
            {/* Theme Toggle */}
            <Nav.Link onClick={toggleTheme} className="me-2" aria-label="Toggle theme">
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </Nav.Link>

            <Nav.Link as={Link} to="/cart" className="me-2 position-relative">
              <FaShoppingCart />
              {totalItems > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {totalItems}
                </Badge>
              )}
            </Nav.Link> 

            <Nav.Link as={Link} to="/favourites" className="me-2 position-relative">
              <FaHeart />
              {favouritesCount > 0 && (
                <Badge 
                  bg="warning" 
                  text="dark"
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {favouritesCount}
                </Badge>
              )}
            </Nav.Link>

            {/* User Menu (placeholder) */}
            <NavDropdown
              title={<FaUser />}
              id="user-dropdown"
              show={showUserMenu}
              onToggle={(isOpen) => setShowUserMenu(isOpen)}
              align="end"
            >
              <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
              {/* Sau này thay bằng trạng thái đăng nhập thật */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
