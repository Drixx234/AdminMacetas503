import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecuperarPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('20240096@ricaldone.edu.sv');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('El correo es requerido');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Correo electrónico inválido');
      return;
    }
    
    setSuccess(true);
    setTimeout(() => {
      navigate('/verificar');
    }, 1500);
  };

  if (success) {
    return (
      <div className="flex justify-center items-center min-h-screen" style={{ background: 'linear-gradient(135deg, #AEBC98 0%, #8A9B6E 100%)' }}>
        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
          <div className="mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(174, 188, 152, 0.2)' }}>
              <svg className="w-8 h-8" style={{ color: '#8A9B6E' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Correo Enviado!</h2>
            <p className="text-gray-600">Hemos enviado un código de verificación a:</p>
            <p className="font-semibold mt-1" style={{ color: '#8A9B6E' }}>{email}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ background: 'linear-gradient(135deg, #AEBC98 0%, #8A9B6E 100%)' }}>
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-gray-800 text-3xl font-bold mb-2">Recupera tu Contraseña</h2>
          <p className="text-gray-500 text-sm">
            Ingresa tu Correo electrónico para enviarte un código de verificación.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-semibold text-sm">Correo</label>
            <input
              type="email"
              value={email}
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
              placeholder="20240096@ricaldone.edu.sv"
            />
            {error && (
              <div className="text-red-500 text-xs mt-1">
                {error}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="text-white py-3 rounded-lg font-semibold transform hover:-translate-y-0.5 transition-all shadow-md"
            style={{ background: 'linear-gradient(135deg, #AEBC98 0%, #8A9B6E 100%)' }}
          >
            Enviar Código
          </button>

          <div className="text-center">
            <button 
              type="button" 
              className="bg-none border-none cursor-pointer text-sm underline transition-colors"
              style={{ color: '#8A9B6E' }}
              onClick={() => navigate('/login')}
            >
              ¿Recuerdas tu contraseña?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecuperarPassword;