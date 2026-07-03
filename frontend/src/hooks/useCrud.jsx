import { useState, useMemo } from 'react';

export const useCrud = (initialData = []) => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const itemsPerPage = 4;

  const addItem = (newItem) => {
    const itemToAdd = {
      id: data.length + 1,
      ...newItem
    };
    setData([...data, itemToAdd]);
    setShowModal(false);
    return itemToAdd;
  };

  const updateItem = (id, updatedItem) => {
    setData(data.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    ));
    setEditingItem(null);
    setShowModal(false);
  };

  const deleteItem = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const filteredData = useMemo(() => {
    let result = data;
    
    // Búsqueda por cualquier campo
    if (searchTerm) {
      result = result.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Filtro por status (solo si existe la propiedad)
    if (filter !== 'todos') {
      result = result.filter(item => {
        // Si el item tiene status, filtrar, si no, mostrar todo
        if (item.status) {
          return item.status === filter;
        }
        return true;
      });
    }
    
    return result;
  }, [data, searchTerm, filter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
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
    closeModal
  };
};