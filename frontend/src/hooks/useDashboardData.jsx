import { useState, useMemo } from 'react';

export const useDashboardData = () => {
  const [timeRange, setTimeRange] = useState('Últimos 30 días');

  const topProducts = useMemo(() => [
    { id: 1, product: 'Mini-8', fecha: 'Mayo 5', estatus: 'Revivido', precio: '$25.50', cliente: 'Maximiliano' },
    { id: 2, product: 'Hexagonal', fecha: 'Junio 10', estatus: 'Revivido', precio: '$30.50', cliente: 'Serena' },
    { id: 3, product: 'Buho pot', fecha: 'Diciembre 5', estatus: 'Revivido', precio: '$41.50', cliente: 'Francisca' },
    { id: 4, product: 'Mini-8', fecha: 'Marzo 15', estatus: 'Revivido', precio: '$15.50', cliente: 'Ricardo D' }
  ], []);

  const recentOrders = useMemo(() => [
    { id: 1, product: 'Mini-8', fecha: 'Mayo 5', estatus: 'Revivido', precio: '$25.50', cliente: 'Maximiliano' },
    { id: 2, product: 'Hexagonal', fecha: 'Junio 10', estatus: 'Revivido', precio: '$30.50', cliente: 'Serena' },
    { id: 3, product: 'Buho pot', fecha: 'Diciembre 5', estatus: 'Revivido', precio: '$41.50', cliente: 'Francisca' },
    { id: 4, product: 'Mini-8', fecha: 'Marzo 15', estatus: 'Revivido', precio: '$15.50', cliente: 'Ricardo D' }
  ], []);

  const stats = useMemo(() => ({
    totalVendido: { value: '$1,524', percentage: '10.5%', label: 'Mas Esta Semana' },
    totalOrdenes: { value: '524', percentage: '15.5%', label: 'Mas Esta Semana' },
    totalProductos: { value: '1,500', percentage: '15.5%', label: 'Mas Esta Semana' }
  }), []);

  const ventasCategoria = useMemo(() => ({
    total: '$1,500.00',
    detalle: [
      { label: '16,100', percentage: '+45%', width: '75%' },
      { label: 'Tiny Pots', percentage: '', width: '45%' }
    ]
  }), []);

  return {
    topProducts,
    recentOrders,
    stats,
    ventasCategoria,
    timeRange,
    setTimeRange
  };
};