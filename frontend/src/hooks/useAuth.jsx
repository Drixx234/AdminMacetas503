import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdminRequest, registerAdminRequest } from '../api/authApi';

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const data = await loginAdminRequest(email, password);
      setLoading(false);
      navigate('/dashboard');
      return data;
    } catch (err) {
      setError(err.message || 'Credenciales incorrectas');
      setLoading(false);
      throw err;
    }
  };

  const register = async (data) => {
    setLoading(true);
    setError('');
    try {
      const result = await registerAdminRequest(data);

      // guardamos el email y marcamos el contexto para que /verificar sepa qué endpoint usar
      localStorage.setItem('verifyEmail', data.email);
      localStorage.setItem('verifyContext', 'register');

      setLoading(false);
      navigate('/verificar');
      return result;
    } catch (err) {
      setError(err.message || 'No se pudo completar el registro');
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    navigate('/login');
  };

  return {
    loading,
    error,
    login,
    register,
    logout,
    setError
  };
};