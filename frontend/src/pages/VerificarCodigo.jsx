import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCodeVerification } from '../hooks/useCodeVerification';
import { useToast } from '../hooks/useToast';

const VerificarCodigo = () => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast(4000);

  const handleSuccess = () => {
    showSuccess('Código verificado correctamente');
    setTimeout(() => {
      navigate('/nueva-contrasena');
    }, 500);
  };

  const handleError = () => {
    showError('Código incorrecto. Por favor, intenta de nuevo.');
  };

  const { code, error, inputRefs, handleChange, handleKeyDown, verifyCode } = useCodeVerification(
    6,
    handleSuccess,
    handleError
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyCode('123456');
  };

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ background: 'linear-gradient(135deg, #AEBC98 0%, #8A9B6E 100%)' }}>
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-gray-800 text-3xl font-bold mb-2">Ingresa el Código</h2>
          <p className="text-gray-500 text-sm">Te enviamos un código de verificación a tu correo.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <label className="text-gray-600 font-semibold text-sm text-center">
              Código de Verificación
            </label>
            <div className="flex justify-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={inputRefs[index]}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl transition-all placeholder:text-gray-300 focus:outline-none"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#AEBC98';
                    e.target.style.boxShadow = '0 0 0 2px rgba(174, 188, 152, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="0"
                />
              ))}
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="text-white py-3 rounded-lg font-semibold transform hover:-translate-y-0.5 transition-all shadow-md"
            style={{ background: 'linear-gradient(135deg, #AEBC98 0%, #8A9B6E 100%)' }}
          >
            Verificar Código
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

export default VerificarCodigo;