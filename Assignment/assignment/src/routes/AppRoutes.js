import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import Favourites from '../pages/Favourites';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/cart" 
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/favourites" 
        element={
          <ProtectedRoute>
            <Favourites />
          </ProtectedRoute>
        } 
      />
      {/* Sau này mở thêm routes khác ở đây */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
