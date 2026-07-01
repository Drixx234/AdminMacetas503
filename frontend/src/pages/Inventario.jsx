import React, { useState } from 'react';
import MenuLateral from '../components/MenuLateral';

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

const AlertIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const InventarioPage = ({ onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('todos');

  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Mini-8', categoria: 'Cilíndrica', precio: '$1.25', stock: 45, status: 'En Stock' },
    { id: 2, nombre: 'Tintos', categoria: 'Paws', precio: '$5.00', stock: 8, status: 'Stock Bajo' },
    { id: 3, nombre: 'Puntos', categoria: 'Season Shapes', precio: '$5.00', stock: 50, status: 'En Stock' },
    { id: 4, nombre: 'Cilíndrica', categoria: 'Buho', precio: '$5.00', stock: 3, status: 'Stock Bajo' },
    { id: 5, nombre: 'Paws', categoria: 'Season Shapes', precio: '$5.00', stock: 0, status: 'Fuera de Stock' },
    { id: 6, nombre: 'Season Shapes', categoria: 'Cilíndrica', precio: '$5.00', stock: 30, status: 'En Stock' },
    { id: 7, nombre: 'Buho', categoria: 'Paws', precio: '$5.00', stock: 5, status: 'Stock Bajo' },
    { id: 8, nombre: 'Mini-8', categoria: 'Season Shapes', precio: '$1.25', stock: 60, status: 'En Stock' },
    { id: 9, nombre: 'Tintos', categoria: 'Cilíndrica', precio: '$5.00', stock: 0, status: 'Fuera de Stock' },
    { id: 10, nombre: 'Puntos', categoria: 'Buho', precio: '$5.00', stock: 25, status: 'En Stock' },
  ]);

  // Estadísticas
  const totalProductos = productos.length;
  const stockBajo = productos.filter(p => p.status === 'Stock Bajo').length;
  const fueraStock = productos.filter(p => p.status === 'Fuera de Stock').length;
  const enStock = productos.filter(p => p.status === 'En Stock').length;

  const filteredData = productos.filter(item => {
    const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'todos' || item.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch(status) {
      case 'En Stock': return 'bg-green-100 text-green-700';
      case 'Stock Bajo': return 'bg-yellow-100 text-yellow-700';
      case 'Fuera de Stock': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <MenuLateral onLogout={onLogout} />
      
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Inventario</h2>
          <p className="text-gray-500 text-sm">Maneja y Visualiza tu Inventario</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Productos Totales</p>
                <p className="text-2xl font-bold text-gray-800">{totalProductos}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <PackageIcon2 />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Stock Bajo</p>
                <p className="text-2xl font-bold text-gray-800">{stockBajo}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                <AlertIcon />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Fuera de Stock</p>
                <p className="text-2xl font-bold text-gray-800">{fueraStock}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <XIcon />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Productos en Stock</p>
                <p className="text-2xl font-bold text-gray-800">{enStock}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <CheckIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative w-full">
              <input
                type="text"
                placeholder="Buscar producto..."
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
                onClick={() => { setFilterStatus('todos'); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filterStatus === 'todos'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => { setFilterStatus('En Stock'); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filterStatus === 'En Stock'
                    ? 'bg-blue-400 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                En Stock
              </button>
              <button
                onClick={() => { setFilterStatus('Stock Bajo'); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filterStatus === 'Stock Bajo'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Stock Bajo
              </button>
              <button
                onClick={() => { setFilterStatus('Fuera de Stock'); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filterStatus === 'Fuera de Stock'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Fuera de Stock
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre del Producto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estatus</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentData.length > 0 ? (
                  currentData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800 font-medium">{item.nombre}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.categoria}</td>
                      <td className="px-4 py-3 text-sm text-gray-800 font-medium">{item.precio}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.stock} ud</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            <EditIcon />
                          </button>
                          <button className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors">
                            <DeleteIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      No se encontraron productos
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
    </div>
  );
};

export default InventarioPage;