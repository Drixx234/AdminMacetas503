import React from 'react';
import MenuLateral from '../components/MenuLateral';
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

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const OrdenesPersonalizadasPage = ({ onLogout }) => {
  const { showSuccess } = useToast(3000);

  const initialOrdenes = [
    { id: 1, producto: 'Mini-8', items: 4, cliente: 'Alejandro Marquez', tipo: 'Cliente nuevo', orden: '#GR-284730', fecha: 'Ene 01, 2026', monto: '$5.00', metodo: 'Mastercard', estatus: 'Pendiente' },
    { id: 2, producto: 'Mini-8', items: 4, cliente: 'Alejandro Marquez', tipo: 'Cliente nuevo', orden: '#GR-284731', fecha: 'Ene 02, 2026', monto: '$5.00', metodo: 'Mastercard', estatus: 'Aceptado' },
    { id: 3, producto: 'Mini-8', items: 4, cliente: 'Alejandro Marquez', tipo: 'Cliente nuevo', orden: '#GR-284732', fecha: 'Ene 03, 2026', monto: '$5.00', metodo: 'Mastercard', estatus: 'Eliminar' },
    { id: 4, producto: 'Mini-8', items: 4, cliente: 'Alejandro Marquez', tipo: 'Cliente nuevo', orden: '#GR-284733', fecha: 'Ene 04, 2026', monto: '$5.00', metodo: 'Mastercard', estatus: 'Descargar' },
    { id: 5, producto: 'Mini-8', items: 4, cliente: 'Alejandro Marquez', tipo: 'Cliente nuevo', orden: '#GR-284734', fecha: 'Ene 05, 2026', monto: '$5.00', metodo: 'Mastercard', estatus: 'Pendiente' },
    { id: 6, producto: 'Mini-8', items: 4, cliente: 'Alejandro Marquez', tipo: 'Cliente nuevo', orden: '#GR-284735', fecha: 'Ene 06, 2026', monto: '$5.00', metodo: 'Mastercard', estatus: 'Aceptado' },
    { id: 7, producto: 'Mini-8', items: 4, cliente: 'Alejandro Marquez', tipo: 'Cliente nuevo', orden: '#GR-284736', fecha: 'Ene 07, 2026', monto: '$5.00', metodo: 'Mastercard', estatus: 'Pendiente' },
    { id: 8, producto: 'Mini-8', items: 4, cliente: 'Alejandro Marquez', tipo: 'Cliente nuevo', orden: '#GR-284737', fecha: 'Ene 08, 2026', monto: '$5.00', metodo: 'Mastercard', estatus: 'Aceptado' }
  ];

  const {
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    currentPage,
    setCurrentPage,
    filteredData,
    currentData,
    totalPages,
    startIndex,
    itemsPerPage,
    deleteItem
  } = useCrud(initialOrdenes);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Aceptado': return 'bg-green-100 text-green-700';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-700';
      case 'Eliminar': return 'bg-red-100 text-red-700';
      case 'Descargar': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta orden?')) {
      deleteItem(id);
      showSuccess('Orden eliminada exitosamente');
    }
  };

  const stats = [
    { label: 'Ordenes Pendientes', value: '40', icon: ClockIcon, color: 'yellow' },
    { label: 'Ordenes Completas', value: '40', icon: CheckIcon, color: 'blue' },
    { label: 'Ordenes Rechazadas', value: '10', icon: XIcon, color: 'red' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <MenuLateral onLogout={onLogout} />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Ordenes Personalizadas</h2>
          <p className="text-gray-500 text-sm">Maneja y Visualiza el Registro de Ordenes Personalizadas</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              yellow: 'bg-yellow-100 text-yellow-600',
              blue: 'bg-blue-100 text-blue-600',
              red: 'bg-red-100 text-red-600'
            };
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[stat.color]}`}>
                    <Icon />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative w-full">
              <input
                type="text"
                placeholder="Buscar orden..."
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
            
            <div className="flex space-x-2 flex-wrap gap-2">
              <button
                onClick={() => { setFilter('todos'); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'todos'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => { setFilter('Aceptado'); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'Aceptado'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Aceptado
              </button>
              <button
                onClick={() => { setFilter('Pendiente'); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'Pendiente'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pendiente
              </button>
              <button
                onClick={() => { setFilter('Eliminar'); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'Eliminar'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Eliminar
              </button>
              <button
                onClick={() => { setFilter('Descargar'); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'Descargar'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Descargar
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre Del Producto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre Del Cliente</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Id Orden</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto Pagado</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estatus</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentData.length > 0 ? (
                  currentData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm text-gray-800 font-medium">{item.producto}</p>
                          <p className="text-xs text-gray-400">{item.items} items</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm text-gray-800">{item.cliente}</p>
                          <p className="text-xs text-gray-400">{item.tipo}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm text-gray-600 font-mono">{item.orden}</p>
                          <p className="text-xs text-gray-400">{item.fecha}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm text-gray-800 font-medium">{item.monto}</p>
                          <p className="text-xs text-gray-400">Pagado en {item.metodo}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.estatus)}`}>
                          {item.estatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
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
                          <button className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors">
                            <DownloadIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      No se encontraron órdenes
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
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
                {totalPages > 5 && (
                  <>
                    <span className="text-gray-400">...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className={`px-3 py-1 text-sm rounded transition-colors ${
                        currentPage === totalPages
                          ? 'bg-green-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
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
    </div>
  );
};

export default OrdenesPersonalizadasPage;