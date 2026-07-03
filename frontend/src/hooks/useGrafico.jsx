import { useMemo } from 'react';

export const useGrafico = (data, valueKey = 'value', labelKey = 'label') => {
  const maxValue = useMemo(() => {
    return Math.max(...data.map(item => item[valueKey]));
  }, [data, valueKey]);

  const calcularAltura = (value) => {
    return (value / maxValue) * 100;
  };

  const datosConAltura = useMemo(() => {
    return data.map(item => ({
      ...item,
      altura: calcularAltura(item[valueKey])
    }));
  }, [data, maxValue, valueKey]);

  return {
    maxValue,
    calcularAltura,
    datosConAltura
  };
};