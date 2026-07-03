import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { useToast } from '../hooks/useToast';
import Logo from '../assets/logo.png';

const Registro = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const { toasts, showError, showSuccess } = useToast(4000);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'El nombre es requerido';
    }
    if (!values.email) {
      errors.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Correo electrónico inválido';
    }
    if (!values.password) {
      errors.password = 'La contraseña es requerida';
    } else if (values.password.length < 6) {
      errors.password = 'Debe tener al menos 6 caracteres';
    }
    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }
    return errors;
  };

  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }, validate);

  const onSubmit = async (formData) => {
    try {
      await register(formData);
      showSuccess('¡Cuenta creada! Revisa tu correo para el código de verificación.');
    } catch (err) {
      showError(err.message || 'No se pudo completar el registro.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ background: 'linear-gradient(135deg, #AEBC98 0%, #8A9B6E 100%)' }}>
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-6 py-3 rounded-lg shadow-lg font-medium transition-all transform animate-slide-in ${
              toast.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' :
              toast.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
              'bg-blue-50 text-blue-700 border border-blue-200'
            }`}
            style={{ minWidth: '280px' }}
          >
            {toast.message}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <img src={Logo} alt="Macetas503" className="w-16 h-16 mx-auto mb-4 rounded-full object-cover" />
          <h2 className="text-gray-800 text-3xl font-bold mb-2">Crear cuenta de Admin</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-semibold text-sm">Nombre</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="p-3 border-2 border-gray-200 rounded-lg transition-all focus:outline-none"
              placeholder="Tu nombre"
            />
            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-semibold text-sm">Correo</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="p-3 border-2 border-gray-200 rounded-lg transition-all focus:outline-none"
              placeholder="admin@macetas503.com"
            />
            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-semibold text-sm">Contraseña</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="p-3 border-2 border-gray-200 rounded-lg transition-all focus:outline-none"
              placeholder="********"
            />
            {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-semibold text-sm">Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              className="p-3 border-2 border-gray-200 rounded-lg transition-all focus:outline-none"
              placeholder="********"
            />
            {errors.confirmPassword && <div className="text-red-500 text-xs mt-1">{errors.confirmPassword}</div>}
          </div>

          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="text-white py-3 rounded-lg font-semibold transform hover:-translate-y-0.5 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #AEBC98 0%, #8A9B6E 100%)' }}
          >
            {loading ? 'Creando...' : 'Crear cuenta'}
          </button>

          <div className="text-center">
            <button
              type="button"
              className="bg-none border-none cursor-pointer text-sm underline transition-colors"
              style={{ color: '#8A9B6E' }}
              onClick={() => navigate('/login')}
            >
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;