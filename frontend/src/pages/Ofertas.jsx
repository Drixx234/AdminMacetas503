import React from 'react';
import MenuLateral from '../components/MenuLateral';
import ModalAgregarProducto from '../components/ModalAgregarProducto';
import { useCrud } from '../hooks/useCrud';
import { useToast } from '../hooks/useToast';
import { getOffers, createOffer, updateOffer, deleteOffer } from '../api/offersApi';

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

// Campos del formulario: los "name" DEBEN coincidir exactamente con el modelo
// backend/src/models/offers.js (title, description, discount, ofert_price, stock, status, image)
const ofertaFields = [
  { name: 'title', label: 'Título', type: 'text', placeholder: 'Ej: 2x1 en velas aromáticas', required: true, column: 'left' },
  { name: 'discount', label: 'Descuento (%)', type: 'number', placeholder: '0', required: true, column: 'left' },
  { name: 'ofert_price', label: 'Precio de oferta', type: 'number', placeholder: '0.00', required: true, column: 'left' },
  { name: 'stock', label: 'Existencias', type: 'number', placeholder: '0', required: true, column: 'left' },
  { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Escribe una descripción detallada......', required: true, column: 'right', rows: 4 },
  { name: 'image', label: 'Imagen de la oferta', type: 'file', column: 'right' }
];

const offersApi = {
  getAll: getOffers,
  create: createOffer,
  update: updateOffer,
  remove: deleteOffer
};

const OfertasPage = ({ onLogout }) => {
  const { showSuccess, showError } = useToast(3000);

  const {
    loading,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    showModal,
    editingItem,
    filteredData,
    currentData,
    totalPages,
    startIndex,
    itemsPerPage,
    addItem,
    updateItem,
    deleteItem,
    openModal,
    closeModal
  } = useCrud(offersApi);

  const buildFormData = (values) => {
    const fd = new FormData();
    fd.append('title', values.title);
    fd.append('description', values.description);
    fd.append('discount', values.discount);
    fd.append('ofert_price', values.ofert_price);
    fd.append('stock', values.stock);
    if (values.image instanceof File) {
      fd.append('image', values.image);
    }
    return fd;
  };

  const handleSaveOferta = async (formValues) => {
    try {
      const fd = buildFormData(formValues);
      if (editingItem) {
        await updateItem(editingItem._id, fd);
        showSuccess('Oferta actualizada exitosamente');
      } else {
        await addItem(fd);
        showSuccess('Oferta agregada exitosamente');
      }
    } catch (err) {
      showError(err.message || 'No se pudo guardar la oferta');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta oferta?')) {
      try {
        await deleteItem(id);
        showSuccess('Oferta eliminada exitosamente');
      } catch (err) {
        showError(err.message || 'No se pudo eliminar la oferta');
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <MenuLateral onLogout={onLogout} />

      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Ofertas</h2>
          <button
            onClick={() => openModal(null)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
          >
            <span>+ Agregar oferta</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex-1 relative w-full">
            <input
              type="text"
              placeholder="Buscar oferta"
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

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descuento</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio oferta</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imagen</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                      Cargando...
                    </td>
                  </tr>
                ) : currentData.length > 0 ? (
                  currentData.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">{item.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.description}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.discount}%</td>
                      <td className="px-4 py-3 text-sm text-gray-800 font-medium">${item.ofert_price}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.stock}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${item.status ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {item.status ? 'Activa' : 'Inactiva'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-10 h-10 object-cover rounded" />
                        ) : '—'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openModal(item)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
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
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                      No se encontraron ofertas
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
        onClose={closeModal}
        onSave={handleSaveOferta}
        title={editingItem ? 'EDITAR OFERTA' : 'AGREGAR OFERTA NUEVA'}
        buttonText={editingItem ? 'Guardar Cambios' : 'Guardar Oferta'}
        fields={ofertaFields}
        initialValues={editingItem}
      />
    </div>
  );
};

export default OfertasPage;
