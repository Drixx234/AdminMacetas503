import React, { useState } from 'react';
import MenuLateral from '../components/MenuLateral';
import FotoPerfil from '../assets/logo.png';

const AjustesPage = ({ onLogout }) => {
  const [formData, setFormData] = useState({
    nombre: 'Administrador',
    telefono: '+503 7000-0000',
    email: 'admin@macetas503.com',
    redesSociales: '@macetas503',
    horarioApertura: '8:00 AM',
    horarioCierre: '8:00 PM',
    contraseña: '********',
    twoFA: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleToggle2FA = () => {
    setFormData({
      ...formData,
      twoFA: !formData.twoFA
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <MenuLateral onLogout={onLogout} />
      
      <div className="flex-1 overflow-auto p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Ajustes</h2>

        {/* Fila 1: Ajustes de Perfil + Ajustes Generales */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Ajustes de Perfil */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Ajustes de Perfil</h3>
            </div>
            <div className="p-6 space-y-4">
              {/* Foto de perfil */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                  <img 
                    src={FotoPerfil} 
                    alt="Foto de perfil" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Foto de perfil</p>
                  <button className="text-sm text-green-600 hover:text-green-700 transition-colors">
                    Cambiar foto
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número Telefónico</label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Ajustes Generales */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Ajustes Generales</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Redes Sociales</label>
                <input
                  type="text"
                  name="redesSociales"
                  value={formData.redesSociales}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ajustes de Horario</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Abierto</label>
                    <input
                      type="text"
                      name="horarioApertura"
                      value={formData.horarioApertura}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Cerrado</label>
                    <input
                      type="text"
                      name="horarioCierre"
                      value={formData.horarioCierre}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fila 2: Cuenta y seguridad (ancho completo) */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Cuenta y seguridad</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <div className="flex gap-4">
                <input
                  type="password"
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="px-4 py-2 text-sm text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
                  Cambiar Contraseña
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-sm font-medium text-gray-700">Autenticación de dos pasos (2FA)</p>
                <p className="text-xs text-gray-500">Seguridad Extra</p>
              </div>
              <button
                type="button"
                onClick={handleToggle2FA}
                className={`relative w-12 h-6 rounded-full transition-colors ${formData.twoFA ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.twoFA ? 'translate-x-6' : ''}`} />
              </button>
            </div>
            <div className="mt-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800 font-medium">Confirmar Nuevos Cambios</p>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4">
          <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AjustesPage;