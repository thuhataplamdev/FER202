import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { login } = useAuth();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsLoading(true);
  try {
    await login({ email: formData.email, password: formData.password });
    showToast?.('Login successful!', 'success');
    navigate('/');
  } catch (err) {
    showToast?.(err.message || 'Login failed. Please try again.', 'error');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div style={{ backgroundColor: colors.primary, minHeight: '100vh', padding: '20px 0' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card 
              className="border-0 shadow"
              style={{ backgroundColor: colors.secondary }}
            >
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <FaSignInAlt className="text-primary fa-2x mb-3" />
                  <h2 style={{ color: colors.text }}>Welcome Back</h2>
                  <p 
                    className="text-muted"
                    style={{ color: colors.textSecondary }}
                  >
                    Sign in to your account to continue
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: colors.text }}>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: colors.text }}>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      style={{ color: colors.textSecondary }}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <div className="text-center">
                    <p 
                      className="mb-2"
                      style={{ color: colors.textSecondary }}
                    >
                      Don't have an account?{' '}
                      <Link to="/register" style={{ color: colors.accent }}>
                        Sign up here
                      </Link>
                    </p>
                    
                    <Link 
                      to="/forgot-password" 
                      style={{ color: colors.accent, fontSize: '0.9rem' }}
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            {/* Demo Credentials */}
            <Card 
              className="border-0 shadow mt-3"
              style={{ backgroundColor: colors.secondary }}
            >
              <Card.Body className="p-3">
                <small style={{ color: colors.textSecondary }}>
                  <strong>Demo Credentials:</strong><br />
                  Email: demo@example.com<br />
                  Password: demo123
                </small>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login; 