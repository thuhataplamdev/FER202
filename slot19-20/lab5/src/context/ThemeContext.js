import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? {
      primary: '#1a1a1a',
      secondary: '#2d2d2d',
      text: '#ffffff',
      textSecondary: '#cccccc',
      accent: '#4a90e2'
    } : {
      primary: '#ffffff',
      secondary: '#f8f9fa',
      text: '#333333',
      textSecondary: '#666666',
      accent: '#007bff'
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}; 