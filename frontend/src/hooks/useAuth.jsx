import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = (email, password) => {
    setLoading(true);
    setError('');
    
    // Simular autenticación
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password === '123456') {
          const userData = { email, name: 'Administrador' };
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem('token', 'fake-token');
          localStorage.setItem('user', JSON.stringify(userData));
          setLoading(false);
          navigate('/dashboard');
          resolve(userData);
        } else {
          setError('Contraseña incorrecta');
          setLoading(false);
          reject('Contraseña incorrecta');
        }
      }, 500);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
      return true;
    }
    return false;
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
    checkAuth,
    setError
  };
};