import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'admin@macetas503.com',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password === '123456') {
      navigate('/dashboard');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const handleForgotPassword = () => {
    navigate('/recuperar');
  };

  return (
    <div className="flex min-h-screen" style={{ background: 'linear-gradient(135deg, #AEBC98 0%, #8A9B6E 100%)' }}>
      <div className="flex-1 flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-lg">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Macetas503</h1>
            
            <div className="w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
              <img 
                src={Logo} 
                alt="Macetas503" 
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-4xl font-bold text-white">Bienvenidos de vuelta</h2>
          </div>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center p-10">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-gray-800 text-3xl font-bold">Ingresa a tu Panel</h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-gray-600 font-semibold text-sm">Correo</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border-2 border-gray-200 rounded-lg transition-all focus:outline-none"
                onFocus={(e) => {
                  e.target.style.borderColor = '#AEBC98';
                  e.target.style.boxShadow = '0 0 0 2px rgba(174, 188, 152, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="admin@macetas503.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-600 font-semibold text-sm">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="p-3 border-2 border-gray-200 rounded-lg transition-all focus:outline-none"
                onFocus={(e) => {
                  e.target.style.borderColor = '#AEBC98';
                  e.target.style.boxShadow = '0 0 0 2px rgba(174, 188, 152, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="********"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="text-white py-3 rounded-lg font-semibold transform hover:-translate-y-0.5 transition-all shadow-md"
              style={{ background: 'linear-gradient(135deg, #AEBC98 0%, #8A9B6E 100%)' }}
            >
              Iniciar Sesión
            </button>

            <div className="text-center">
              <button 
                type="button" 
                className="bg-none border-none cursor-pointer text-sm underline transition-colors"
                style={{ color: '#8A9B6E' }}
                onClick={handleForgotPassword}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;