import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_BASE = 'http://localhost:4001';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);          // chỉ giữ trong state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  // Không dùng localStorage để lưu user nữa
  useEffect(() => {
    // Nếu muốn tự login lại theo session, bạn có thể dùng sessionStorage ở đây (tùy chọn)
  }, []);

  const fetchAccountByEmail = async (email) => {
    const res = await fetch(`${API_BASE}/accounts?email=${encodeURIComponent(email)}`);
    if (!res.ok) throw new Error('Network error');
    const arr = await res.json();
    return arr[0] || null;
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const acc = await fetchAccountByEmail(email);
      if (!acc || acc.password !== password) {
        throw new Error('Invalid email or password');
      }
      // Không lưu localStorage theo yêu cầu
      const { password: _pw, ...safeUser } = acc;
      setUser(safeUser);
      setIsAuthenticated(true);
      return safeUser;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      // Check trùng email
      const existed = await fetchAccountByEmail(userData.email);
      if (existed) {
        throw new Error('Email already registered');
      }
      // POST tạo tài khoản mới (json-server sẽ tự gán id)
      const res = await fetch(`${API_BASE}/accounts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (!res.ok) throw new Error('Register failed');
      const created = await res.json();

      const { password: _pw, ...safeUser } = created;
      setUser(safeUser);
      setIsAuthenticated(true);
      return safeUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // không đụng localStorage
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContext;