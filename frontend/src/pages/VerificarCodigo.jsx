import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { verifyCodeAdminRequest, recoveryVerifyCodeAdminRequest } from '../api/authApi';

const VerificarCodigo = () => {
  const navigate = useNavigate();
  const { toasts, showError, showSuccess } = useToast(4000);
  const [code, setCode] = React.useState(Array(6).fill(''));
  const inputRefs = Array.from({ length: 6 }, () => React.useRef());

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const upper = value.toUpperCase();
    const newCode = [...code];
    newCode[index] = upper;
    setCode(newCode);
    if (upper && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');

    if (fullCode.length < 6) {
      showError('Ingresa los 6 caracteres del código.');
      return;
    }

    const context = localStorage.getItem('verifyContext'); // 'register' | 'recovery'

    try {
      if (context === 'recovery') {
        await recoveryVerifyCodeAdminRequest(fullCode);
      } else {
        await verifyCodeAdminRequest(fullCode);
      }

      showSuccess('Código verificado correctamente');

      if (context === 'register') {
        localStorage.removeItem('verifyEmail');
        localStorage.removeItem('verifyContext');
        setTimeout(() => navigate('/login'), 500);
      } else {
        // dejamos verifyContext hasta terminar el flujo de nueva contraseña
        setTimeout(() => navigate('/nueva-contrasena'), 500);
      }
    } catch (err) {
      showError(err.message || 'Código incorrecto. Por favor, intenta de nuevo.');
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
          <h2 className="text-gray-800 text-3xl font-bold mb-2">Ingresa el Código</h2>
          <p className="text-gray-500 text-sm">Te enviamos un código de verificación a tu correo.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <label className="text-gray-600 font-semibold text-sm text-center">
              Código de Verificación
            </label>
            <div className="flex justify-center gap-2">
              {code.map((char, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={char}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={inputRefs[index]}
                  className="w-11 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl transition-all placeholder:text-gray-300 focus:outline-none"
                  placeholder="-"
                />
              ))}
            </div>
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