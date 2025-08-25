import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';           
import { FavouritesProvider } from './context/FavouritesContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

import NavBar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';


function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
        <CartProvider>                
          <FavouritesProvider>      
            <ToastProvider>
            <div className="App">
              <NavBar />
              <main>
                <AppRoutes />
              </main>
            </div>
            </ToastProvider>
          </FavouritesProvider>
        </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
