import React, { useMemo } from 'react';
import MenuLateral from '../components/MenuLateral';
import { useCrud } from '../hooks/useCrud';
import { useToast } from '../hooks/useToast';
import { getOrders, updateOrderStatus, deleteOrder } from '../api/ordersApi';

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const STATUS_OPTIONS = ['Pendiente', 'Aceptado', 'En proceso', 'Completo', 'Rechazado'];

const ordersApi = {
  getAll: getOrders,
  remove: deleteOrder
  // No hay 'create': las órdenes las genera el cliente al hacer checkout, el admin no crea órdenes desde aquí.
};

const OrdenesPage = ({ onLogout }) => {
  const { showSuccess, showError } = useToast(3000);

  const {
    data,
    loading,
    error,
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
    deleteItem,
    setData
  } = useCrud(ordersApi);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Aceptado': return 'bg-green-100 text-green-700';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-700';
      case 'En proceso': return 'bg-blue-100 text-blue-700';
      case 'Completo': return 'bg-purple-100 text-purple-700';
      case 'Rechazado': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta orden?')) {
      try {
        await deleteItem(id);
        showSuccess('Orden eliminada exitosamente');
      } catch (err) {
        showError(err.message || 'No se pudo eliminar la orden');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      // Actualiza localmente sin tener que re-pedir todo el listado al backend
      setData(prev => prev.map(order => order._id === id ? { ...order, status: newStatus } : order));
      showSuccess('Estatus actualizado');
    } catch (err) {
      showError(err.message || 'No se pudo actualizar el estatus');
    }
  };

  // Conteos reales calculados a partir de las órdenes cargadas (no son datos fijos de mentira)
  const stats = useMemo(() => ([
    { label: 'Nuevas Ordenes', value: data.length, icon: PackageIcon2, color: 'green' },
    { label: 'Ordenes Pendientes', value: data.filter(o => o.status === 'Pendiente').length, icon: ClockIcon, color: 'yellow' },
    { label: 'Ordenes Completas', value: data.filter(o => o.status === 'Completo').length, icon: CheckIcon, color: 'blue' },
    { label: 'Ordenes Rechazadas', value: data.filter(o => o.status === 'Rechazado').length, icon: XIcon, color: 'red' }
  ]), [data]);

  return (
    <div className="flex h-screen bg-gray-100">
      <MenuLateral onLogout={onLogout} />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Ordenes</h2>
          <p className="text-gray-500 text-sm">Maneja y Visualiza el Registro de Ordenes</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              green: 'bg-green-100 text-green-600',
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

        {/* Search and Filters */}
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
              {STATUS_OPTIONS.map(status => (
                <button
                  key={status}
                  onClick={() => { setFilter(status); setCurrentPage(1); }}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    filter === status
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orden</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto Pagado</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estatus</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      Cargando...
                    </td>
                  </tr>
                ) : currentData.length > 0 ? (
                  currentData.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm text-gray-800 font-medium">{item.product}</p>
                          <p className="text-xs text-gray-400">{item.items} items</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm text-gray-800">{item.client?.name || 'Cliente eliminado'}</p>
                          <p className="text-xs text-gray-400">{item.clientType}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600 font-mono">{item.orderCode}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800 font-medium">${item.total?.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item._id, e.target.value)}
                          className={`px-2 py-1 rounded-full text-xs border-0 cursor-pointer ${getStatusColor(item.status)}`}
                        >
                          {STATUS_OPTIONS.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
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

export default OrdenesPage;
