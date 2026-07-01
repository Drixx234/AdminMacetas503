import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { useToast } from '../hooks/useToast';

const NuevaContrasena = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast(4000);

  const validate = (values) => {
    const errors = {};
    
    if (!values.password) {
      errors.password = 'La contraseña es requerida';
    } else if (values.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirma tu contraseña';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    return errors;
  };

  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm({
    password: '',
    confirmPassword: ''
  }, validate);

  const onSubmit = (formData) => {
    // Simular guardado
    console.log('Contraseña actualizada:', formData.password);
    showSuccess('Contraseña actualizada exitosamente');
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ background: 'linear-gradient(135deg, #AEBC98 0%, #8A9B6E 100%)' }}>
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-gray-800 text-3xl font-bold mb-2">Ingresa tu nueva contraseña</h2>
          <p className="text-gray-500 text-sm">
            Crea una contraseña nueva para mantener tu cuenta segura
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
              placeholder="**********"
            />
            {errors.password && (
              <div className="text-red-500 text-xs mt-1">
                {errors.password}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-semibold text-sm">Contraseña Nueva</label>
            <input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
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
              placeholder="**********"
            />
            {errors.confirmPassword && (
              <div className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="text-white py-3 rounded-lg font-semibold transform hover:-translate-y-0.5 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #AEBC98 0%, #8A9B6E 100%)' }}
          >
            {isSubmitting ? 'Guardando...' : 'Crear Contraseña Nueva'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NuevaContrasena;