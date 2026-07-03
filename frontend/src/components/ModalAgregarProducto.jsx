import React, { useState, useEffect } from 'react';

const ModalAgregarProducto = ({
  isOpen,
  onClose,
  onSave,
  title = 'AGREGAR PRODUCTO NUEVO',
  buttonText = 'Guardar Producto',
  fields = [],
  initialValues = null // objeto del item a editar, o null si es "crear"
}) => {
  const [formData, setFormData] = useState({});

  // Inicializar formData: si hay initialValues (modo edición) los precarga,
  // si no, arranca vacío (modo creación). Se reinicia cada vez que se abre el modal.
  useEffect(() => {
    if (!isOpen) return;

    const initialData = {};
    fields.forEach(field => {
      if (field.type === 'file') {
        initialData[field.name] = null; // el archivo nunca se precarga, solo se reemplaza si el usuario sube uno nuevo
      } else {
        initialData[field.name] = initialValues?.[field.name] ?? '';
      }
    });
    setFormData(initialData);
  }, [isOpen, initialValues, fields]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (fieldName, e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required={field.required}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required={field.required}
          />
        );

      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            required={field.required}
          />
        );

      case 'file':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(field.name, e)}
              className="hidden"
              id={`image-upload-${field.name}`}
            />
            <label htmlFor={`image-upload-${field.name}`} className="cursor-pointer">
              <div className="flex flex-col items-center">
                <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-500">Arrastra y suelta o haz clic para subir una imagen</p>
                {formData[field.name] && (
                  <p className="text-sm text-green-600 mt-2">✓ {formData[field.name].name}</p>
                )}
                {!formData[field.name] && initialValues?.image && (
                  <p className="text-sm text-gray-500 mt-2">Ya tiene una imagen; sube una nueva solo si quieres reemplazarla</p>
                )}
              </div>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  // Dividir campos en dos columnas
  const leftFields = fields.filter(f => f.column === 'left');
  const rightFields = fields.filter(f => f.column === 'right');

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          className="fixed inset-0 pointer-events-auto"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto">
          <div className="border-b px-6 py-4 sticky top-0 bg-white z-10">
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {leftFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {rightFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </div>

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
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAgregarProducto;
