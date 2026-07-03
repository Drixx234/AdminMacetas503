import { useState, useMemo, useEffect, useCallback } from 'react';

/**
 * Hook genérico de CRUD conectado al backend real.
 *
 * No conoce endpoints ni URLs: recibe un objeto `api` con las 4 funciones
 * que tú crees en frontend/src/api/<recurso>Api.js
 *
 * @param {Object} api
 * @param {Function} api.getAll   - () => Promise<Array>
 * @param {Function} api.create  - (formData: FormData) => Promise<Object>
 * @param {Function} api.update  - (id: string, formData: FormData) => Promise<Object>
 * @param {Function} api.remove  - (id: string) => Promise<void>
 */
export const useCrud = (api) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const itemsPerPage = 4;

  // --- Cargar datos reales del backend ---
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await api.getAll();
      setData(items);
    } catch (err) {
      setError(err.message || 'Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- Crear ---
  const addItem = async (formData) => {
    const created = await api.create(formData);
    await fetchData();
    setShowModal(false);
    return created;
  };

  // --- Editar ---
  const updateItem = async (id, formData) => {
    const updated = await api.update(id, formData);
    await fetchData();
    setEditingItem(null);
    setShowModal(false);
    return updated;
  };

  // --- Eliminar ---
  const deleteItem = async (id) => {
    await api.remove(id);
    setData(prev => prev.filter(item => item._id !== id));
  };

  const filteredData = useMemo(() => {
    let result = data;

    if (searchTerm) {
      result = result.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (filter !== 'todos') {
      result = result.filter(item => {
        if (item.status) {
          return item.status === filter;
        }
        return true;
      });
    }

    return result;
  }, [data, searchTerm, filter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages || 1));
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  const resetFilters = () => {
    setSearchTerm('');
    setFilter('todos');
    setCurrentPage(1);
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  return {
    data,
    setData,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    currentPage,
    setCurrentPage,
    showModal,
    setShowModal,
    editingItem,
    filteredData,
    currentData,
    totalPages,
    itemsPerPage,
    startIndex,
    addItem,
    updateItem,
    deleteItem,
    goToPage,
    nextPage,
    prevPage,
    resetFilters,
    openModal,
    closeModal,
    refetch: fetchData
  };
};
