import React, { useState } from 'react';

const AgregarVelaModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    aroma: '',
    tamaño: '',
    precio: '',
    stock: '',
    colores: ['', '', '', '', '', ''],
    imagen: null
  });

  const [selectedColors, setSelectedColors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleColorToggle = (index) => {
    if (selectedColors.includes(index)) {
      setSelectedColors(selectedColors.filter(i => i !== index));
    } else {
      setSelectedColors([...selectedColors, index]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imagen: file
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        {/* Overlay transparente para click fuera */}
        <div 
          className="fixed inset-0 pointer-events-auto"
          onClick={onClose}
        />
        
        {/* Modal - sin fondo oscuro */}
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto">
          {/* Header */}
          <div className="border-b px-6 py-4 sticky top-0 bg-white z-10">
            <h2 className="text-2xl font-semibold text-gray-800">AGREGAR VELA NUEVA</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Columna izquierda */}
              <div className="space-y-4">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ej: Vela Aromática"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Aroma */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aroma</label>
                  <input
                    type="text"
                    name="aroma"
                    value={formData.aroma}
                    onChange={handleInputChange}
                    placeholder="Ej: Lavanda"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Tamaño */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tamaño</label>
                  <input
                    type="text"
                    name="tamaño"
                    value={formData.tamaño}
                    onChange={handleInputChange}
                    placeholder="12 x 7.5cm"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Precio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Columna derecha */}
              <div className="space-y-4">
                {/* Colores de Variación */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Colores de Variación</label>
                  <div className="grid grid-cols-3 gap-2">
                    {formData.colores.map((color, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleColorToggle(index)}
                        className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                          selectedColors.includes(index)
                            ? 'bg-green-500 text-white border-green-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {color || `Color ${index + 1}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    placeholder="Escribe una descripción detallada......"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                {/* Imagen del producto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imagen del producto</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-500">Arrastra y suelta o haz clic para subir una imagen</p>
                        {formData.imagen && (
                          <p className="text-sm text-green-600 mt-2">✓ {formData.imagen.name}</p>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Guardar Vela
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgregarVelaModal;