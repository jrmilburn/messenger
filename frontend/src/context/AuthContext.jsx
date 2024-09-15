import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null); // Add error handling

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    setLoading(true); // Set loading true before login request
    setAuthError(null); // Clear any previous errors
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
      } else {
        // Handle authentication errors
        const errorData = await response.json();
        setAuthError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('An error occurred. Please try again later.');
    } finally {
      setLoading(false); // Set loading false after login request
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading, authError }}>
      {children}
    </AuthContext.Provider>
  );
};
