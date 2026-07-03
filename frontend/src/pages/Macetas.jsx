import React from 'react';
import MenuLateral from '../components/MenuLateral';
import ModalAgregarProducto from '../components/ModalAgregarProducto';
import { useCrud } from '../hooks/useCrud';
import { useToast } from '../hooks/useToast';

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const PackageIcon2 = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MacetasPage = ({ onLogout }) => {
  const { showSuccess } = useToast(3000);

  const initialMacetas = [
    { 
      id: 1,
      nombre: 'Hexagonal', 
      descripcion: 'Maceta con forma hexagonal', 
      dimensiones: '8.5 x 9 x 9cm', 
      peso: '1.65 kg', 
      precio: '$2.00', 
      colores: 'Terracota, Blanco', 
      stock: '65 ud',
      imagen: ''
    },
    { 
      id: 2,
      nombre: 'Hexagonal', 
      descripcion: 'Maceta con forma hexagonal', 
      dimensiones: '8.5 x 9 x 9cm', 
      peso: '1.65 kg', 
      precio: '$2.00', 
      colores: 'Terracota, Blanco', 
      stock: '65 ud',
      imagen: ''
    },
    { 
      id: 3,
      nombre: 'Hexagonal', 
      descripcion: 'Maceta con forma hexagonal', 
      dimensiones: '8.5 x 9 x 9cm', 
      peso: '1.65 kg', 
      precio: '$2.00', 
      colores: 'Terracota, Blanco', 
      stock: '65 ud',
      imagen: ''
    },
    { 
      id: 4,
      nombre: 'Hexagonal', 
      descripcion: 'Maceta con forma hexagonal', 
      dimensiones: '8.5 x 9 x 9cm', 
      peso: '1.65 kg', 
      precio: '$2.00', 
      colores: 'Terracota, Blanco', 
      stock: '65 ud',
      imagen: ''
    },
    { 
      id: 5,
      nombre: 'Cilíndrica', 
      descripcion: 'Maceta cilíndrica moderna', 
      dimensiones: '10 x 10 x 12cm', 
      peso: '1.80 kg', 
      precio: '$3.50', 
      colores: 'Gris, Negro', 
      stock: '42 ud',
      imagen: ''
    },
    { 
      id: 6,
      nombre: 'Cuadrada', 
      descripcion: 'Maceta cuadrada minimalista', 
      dimensiones: '7 x 7 x 8cm', 
      peso: '1.20 kg', 
      precio: '$1.80', 
      colores: 'Blanco, Beige', 
      stock: '89 ud',
      imagen: ''
    },
    { 
      id: 7,
      nombre: 'Redonda', 
      descripcion: 'Maceta redonda clásica', 
      dimensiones: '9 x 9 x 10cm', 
      peso: '1.40 kg', 
      precio: '$2.20', 
      colores: 'Terracota', 
      stock: '73 ud',
      imagen: ''
    },
    { 
      id: 8,
      nombre: 'Hexagonal', 
      descripcion: 'Maceta con forma hexagonal', 
      dimensiones: '8.5 x 9 x 9cm', 
      peso: '1.65 kg', 
      precio: '$2.00', 
      colores: 'Terracota, Blanco', 
      stock: '65 ud',
      imagen: ''
    }
  ];

  const macetaFields = [
    { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Ej: Hexagonal', required: true, column: 'left' },
    { name: 'dimensiones', label: 'Dimensiones', type: 'text', placeholder: '8.5 x 9 x 9cm', required: true, column: 'left' },
    { name: 'peso', label: 'Peso (kg)', type: 'number', placeholder: '0.00', required: true, column: 'left' },
    { name: 'precio', label: 'Precio', type: 'number', placeholder: '0.00', required: true, column: 'left' },
    { name: 'stock', label: 'Existencias', type: 'number', placeholder: '0', required: true, column: 'left' },
    { name: 'colores', label: 'Colores de Variación', type: 'colors', required: true, column: 'right' },
    { name: 'descripcion', label: 'Descripción', type: 'textarea', placeholder: 'Escribe una descripción detallada......', required: true, column: 'right', rows: 4 },
    { name: 'imagen', label: 'Imagen del producto', type: 'file', column: 'right' }
  ];

  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    showModal,
    setShowModal,
    filteredData,
    currentData,
    totalPages,
    startIndex,
    itemsPerPage,
    addItem,
    deleteItem
  } = useCrud(initialMacetas);

  const handleSaveMaceta = (formData) => {
    const macetaToAdd = {
      nombre: formData.nombre,
      descripcion: formData.descripcion || 'Maceta nueva',
      dimensiones: formData.dimensiones,
      peso: `${formData.peso} kg`,
      precio: `$${formData.precio}`,
      colores: formData.colores || 'Varios colores',
      stock: `${formData.stock} ud`,
      imagen: ''
    };
    addItem(macetaToAdd);
    showSuccess('Maceta agregada exitosamente');
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta maceta?')) {
      deleteItem(id);
      showSuccess('Maceta eliminada exitosamente');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <MenuLateral onLogout={onLogout} />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Macetas</h2>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
          >
            <span>+ Agregar maceta</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Nuevas Ordenes</p>
                <p className="text-2xl font-bold text-gray-800">90</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <PackageIcon2 />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ordenes Pendientes</p>
                <p className="text-2xl font-bold text-gray-800">40</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                <ClockIcon />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ordenes Completas</p>
                <p className="text-2xl font-bold text-gray-800">40</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <CheckIcon />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Buscar maceta"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <SearchIcon />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dimensiones</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Peso</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Colores</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imagen</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentData.length > 0 ? (
                  currentData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">{item.nombre}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.descripcion}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.dimensiones}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.peso}</td>
                      <td className="px-4 py-3 text-sm text-gray-800 font-medium">{item.precio}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.colores}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.stock}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 text-2xl">{item.imagen}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            <EditIcon />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                      No se encontraron macetas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredData.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      currentPage === page
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Siguiente
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredData.length)} de {filteredData.length}
              </span>
            </div>
          )}
        </div>
      </div>

      <ModalAgregarProducto
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveMaceta}
        title="AGREGAR MACETA NUEVA"
        buttonText="Guardar Maceta"
        fields={macetaFields}
      />
    </div>
  );
};

export default MacetasPage;