const API = "http://localhost:4000/api";

// Listar todas las plantas
export const getPlants = async () => {

  const response = await fetch(`${API}/plants`, {

    method: "GET",

    credentials: "include"

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudieron obtener las plantas.");
  }

  return data;
};

// Crear una planta nueva (formData debe incluir: name, care, size, price, stock, product_id, image)
export const createPlant = async (formData) => {

  const response = await fetch(`${API}/plants`, {

    method: "POST",

    // sin "Content-Type": el navegador arma el multipart/form-data con el boundary
    credentials: "include",

    body: formData

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo crear la planta.");
  }

  return data;
};

// Actualizar una planta existente (formData con los mismos campos, image es opcional)
export const updatePlant = async (id, formData) => {

  const response = await fetch(`${API}/plants/${id}`, {

    method: "PUT",

    credentials: "include",

    body: formData

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo actualizar la planta.");
  }

  return data;
};

// Eliminar una planta por id
export const deletePlant = async (id) => {

  const response = await fetch(`${API}/plants/${id}`, {

    method: "DELETE",

    credentials: "include"

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo eliminar la planta.");
  }

  return data;
};
