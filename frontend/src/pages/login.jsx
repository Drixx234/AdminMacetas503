import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { useToast } from '../hooks/useToast';
import Logo from '../assets/logo.png';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { toasts, showError, showSuccess } = useToast(4000);
  
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Correo electrónico inválido';
    }
    if (!values.password) {
      errors.password = 'La contraseña es requerida';
    }
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm({
    email: 'admin@macetas503.com',
    password: ''
  }, validate);

  const onSubmit = async (formData) => {
    try {
      await login(formData.email, formData.password);
      showSuccess('Bienvenido, inicio de sesión exitoso');
    } catch (err) {
      showError('Credenciales incorrectas. Por favor, intenta de nuevo.');
    }
  };

  const handleForgotPassword = () => {
    navigate('/recuperar');
  };

  return (
    <div className="flex min-h-screen relative" style={{ background: 'linear-gradient(135deg, #AEBC98 0%, #8A9B6E 100%)' }}>
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-6 py-3 rounded-lg shadow-lg font-medium transition-all transform animate-slide-in ${
              toast.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' :
              toast.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
              toast.type === 'warning' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
              'bg-blue-50 text-blue-700 border border-blue-200'
            }`}
            style={{ minWidth: '280px' }}
          >
            {toast.message}
          </div>
        ))}
      </div>

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

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-gray-600 font-semibold text-sm">Correo</label>
              <input
                type="email"
                name="email"
                value={values.email}
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
              {errors.email && (
                <div className="text-red-500 text-xs mt-1">{errors.email}</div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-600 font-semibold text-sm">Contraseña</label>
              <input
                type="password"
                name="password"
                value={values.password}
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
              {errors.password && (
                <div className="text-red-500 text-xs mt-1">{errors.password}</div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="text-white py-3 rounded-lg font-semibold transform hover:-translate-y-0.5 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #AEBC98 0%, #8A9B6E 100%)' }}
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
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