import { useState, useMemo } from 'react';

export const useReportesData = () => {
  const [periodo, setPeriodo] = useState('Mes');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const stats = useMemo(() => [
    { label: 'Total Vendido', value: '$8,524', percentage: '10.5%', trend: 'up', period: 'que el último periodo' },
    { label: 'Valor Promedio', value: '524', percentage: '5.7%', trend: 'up', period: 'que el último periodo' },
    { label: 'Total de Transacciones', value: '$500', percentage: '12%', trend: 'up', period: 'mas este mes' },
    { label: 'Indice de Crecimiento', value: '18.2%', percentage: '3.4%', trend: 'up', period: 'mas este mes' }
  ], []);

  const ventasPorCategoria = useMemo(() => [
    { label: '32%', name: 'Tiny pots' },
    { label: '24%', name: 'Geo Concrete' },
    { label: '18%', name: 'Season Shapes' }
  ], []);

  const datosGrafico = useMemo(() => [
    { label: 'LUN', value: 4645.85 },
    { label: 'MAR', value: 4000 },
    { label: 'MIE', value: 3500 },
    { label: 'JUE', value: 2500 },
    { label: 'VIE', value: 2000 },
    { label: 'SAB', value: 1500 }
  ], []);

  const productoMasVendido = useMemo(() => ({
    nombre: 'Mini-8',
    datos: [
      { dia: 'TUE', valor: 2000, porcentaje: 100 },
      { dia: 'WED', valor: 2000, porcentaje: 100 },
      { dia: 'THU', valor: 840, porcentaje: 42 },
      { dia: 'FRI', valor: 2000, porcentaje: 100 }
    ]
  }), []);

  const totalVentas = useMemo(() => '$2,100.00', []);

  const coloresBarras = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500'];

  const getMaxValue = (data) => {
    return Math.max(...data.map(d => d.value));
  };

  const calcularPorcentaje = (value, max) => {
    return (value / max) * 100;
  };

  return {
    stats,
    ventasPorCategoria,
    datosGrafico,
    productoMasVendido,
    totalVentas,
    coloresBarras,
    periodo,
    setPeriodo,
    selectedCategory,
    setSelectedCategory,
    getMaxValue,
    calcularPorcentaje
  };
};