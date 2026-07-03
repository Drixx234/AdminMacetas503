import React from 'react';
import MenuLateral from '../components/MenuLateral';
import { useReportesData } from '../hooks/useReportesData';
import { useGrafico } from '../hooks/useGrafico';

const TrendingUpIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const TrendingDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ReportesPage = ({ onLogout }) => {
  const {
    stats,
    ventasPorCategoria,
    datosGrafico,
    productoMasVendido,
    totalVentas,
    coloresBarras,
    periodo,
    setPeriodo
  } = useReportesData();

  const { datosConAltura } = useGrafico(datosGrafico, 'value', 'label');

  return (
    <div className="flex h-screen bg-gray-100">
      <MenuLateral onLogout={onLogout} />
      
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Reporte y Analisis</h2>
          <p className="text-gray-500 text-sm">Reporte y análisis de las ventas</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`flex items-center px-2 py-1 rounded ${
                  stat.trend === 'up' ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'
                }`}>
                  {stat.trend === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                  <span className="text-sm font-medium ml-1">{stat.percentage}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">{stat.period}</p>
            </div>
          ))}
        </div>

        {/* Resumen De Ventas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Resumen De Ventas</h3>
              <div className="flex items-center space-x-2">
                <select 
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                  className="text-sm text-gray-500 border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Mes">Mes</option>
                  <option value="Semana">Semana</option>
                  <option value="Año">Año</option>
                </select>
                <ChevronDownIcon />
              </div>
            </div>
            <div className="text-center mb-4">
              <p className="text-3xl font-bold text-gray-800">{totalVentas}</p>
            </div>
            <div className="h-48 flex items-end justify-between gap-2">
              {datosConAltura.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className={`w-full ${coloresBarras[index % coloresBarras.length]} rounded-t transition-all hover:opacity-80`}
                    style={{ height: `${item.altura}%`, minHeight: '20px' }}
                  />
                  <span className="text-xs text-gray-500 mt-1">{item.label}</span>
                  <span className="text-xs text-gray-400">${item.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Producto Mas Vendido */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Producto Mas Vendido</h3>
              <span className="text-sm text-gray-500">{productoMasVendido.nombre}</span>
            </div>
            <div className="space-y-4">
              {productoMasVendido.datos.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{item.valor}</span>
                    <span className="text-gray-400">{item.dia}</span>
                  </div>
                  <div className="mt-1 h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-2 ${coloresBarras[index % coloresBarras.length]} rounded-full`} 
                      style={{ width: `${item.porcentaje}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ventas Por Categoría */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Ventas Por Categoría</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <div className="w-48 h-48 rounded-full border-8 border-green-500 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">$1,500</p>
                    <p className="text-sm text-gray-500">Total</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {ventasPorCategoria.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{item.name}</span>
                  <span className="text-gray-800 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Patrones De Venta Por Hora</h3>
            <div className="h-48 flex items-end justify-between gap-2">
              {datosConAltura.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-blue-400 rounded-t transition-all hover:bg-blue-500"
                    style={{ height: `${item.altura * 0.7}%`, minHeight: '20px' }}
                  />
                  <span className="text-xs text-gray-500 mt-1">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
              <span>0</span>
              <span>100</span>
              <span>200</span>
              <span>300</span>
              <span>400</span>
              <span>500</span>
              <span>600</span>
              <span>700</span>
              <span>800</span>
              <span>900</span>
              <span>1000</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>Legend</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportesPage;