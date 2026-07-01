import React from 'react';
import MenuLateral from '../components/MenuLateral';

const TrendingUpIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const Dashboard = ({ onLogout }) => {
  const topProducts = [
    { id: 1, product: 'Mini-8', fecha: 'Mayo 5', estatus: 'Revivido', precio: '$25.50', cliente: 'Maximiliano' },
    { id: 2, product: 'Hexagonal', fecha: 'Junio 10', estatus: 'Revivido', precio: '$30.50', cliente: 'Serena' },
    { id: 3, product: 'Buho pot', fecha: 'Diciembre 5', estatus: 'Revivido', precio: '$41.50', cliente: 'Francisca' },
    { id: 4, product: 'Mini-8', fecha: 'Marzo 15', estatus: 'Revivido', precio: '$15.50', cliente: 'Ricardo D' }
  ];

  const recentOrders = [
    { id: 1, product: 'Mini-8', fecha: 'Mayo 5', estatus: 'Revivido', precio: '$25.50', cliente: 'Maximiliano' },
    { id: 2, product: 'Hexagonal', fecha: 'Junio 10', estatus: 'Revivido', precio: '$30.50', cliente: 'Serena' },
    { id: 3, product: 'Buho pot', fecha: 'Diciembre 5', estatus: 'Revivido', precio: '$41.50', cliente: 'Francisca' },
    { id: 4, product: 'Mini-8', fecha: 'Marzo 15', estatus: 'Revivido', precio: '$15.50', cliente: 'Ricardo D' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <MenuLateral onLogout={onLogout} />
      
      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Inicio</h2>
              <p className="text-gray-500">Bienvenido De Nuevo a Macetas503</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-sm">
                <span>Últimos 30 días</span>
                <ChevronDownIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Vendido</p>
                <p className="text-2xl font-bold text-gray-800">$1,524</p>
              </div>
              <div className="flex items-center text-green-500 bg-green-50 px-2 py-1 rounded">
                <TrendingUpIcon />
                <span className="text-sm font-medium ml-1">10.5%</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Mas Esta Semana</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total De Ordenes</p>
                <p className="text-2xl font-bold text-gray-800">524</p>
              </div>
              <div className="flex items-center text-green-500 bg-green-50 px-2 py-1 rounded">
                <TrendingUpIcon />
                <span className="text-sm font-medium ml-1">15.5%</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Mas Esta Semana</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total De Productos</p>
                <p className="text-2xl font-bold text-gray-800">1,500</p>
              </div>
              <div className="flex items-center text-green-500 bg-green-50 px-2 py-1 rounded">
                <TrendingUpIcon />
                <span className="text-sm font-medium ml-1">15.5%</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Mas Esta Semana</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Ventas Por Categoría</h3>
            <div className="flex items-center justify-center h-48">
              <div className="w-48 h-48 rounded-full border-8 border-green-500 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">$1,500.00</p>
                  <p className="text-sm text-gray-500">Total</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Ventas Por Categoría</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Mes</span>
                <ChevronDownIcon />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">16,100</span>
                  <span className="text-sm text-green-500">+45%</span>
                </div>
                <div className="mt-1 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tiny Pots</span>
                </div>
                <div className="mt-1 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-sm font-medium text-gray-700">Top Productos</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estatus</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topProducts.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-600">{item.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{item.product}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.fecha}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          {item.estatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">{item.precio}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.cliente}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-sm font-medium text-gray-700">Ordenes Recientes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estatus</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-600">{item.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{item.product}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.fecha}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          {item.estatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">{item.precio}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.cliente}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;