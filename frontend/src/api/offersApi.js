const API = "http://localhost:4000/api";

// Listar todas las ofertas
export const getOffers = async () => {

  const response = await fetch(`${API}/offers`, {

    method: "GET",

    credentials: "include"

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudieron obtener las ofertas.");
  }

  return data;
};

// Crear una oferta nueva (formData debe incluir: title, description, discount, ofert_price, stock, image)
export const createOffer = async (formData) => {

  const response = await fetch(`${API}/offers`, {

    method: "POST",

    // sin "Content-Type": el navegador arma el multipart/form-data con el boundary
    credentials: "include",

    body: formData

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo crear la oferta.");
  }

  return data;
};

// Actualizar una oferta existente (formData con los mismos campos, image es opcional)
export const updateOffer = async (id, formData) => {

  const response = await fetch(`${API}/offers/${id}`, {

    method: "PUT",

    credentials: "include",

    body: formData

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo actualizar la oferta.");
  }

  return data;
};

// Eliminar una oferta por id
export const deleteOffer = async (id) => {

  const response = await fetch(`${API}/offers/${id}`, {

    method: "DELETE",

    credentials: "include"

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo eliminar la oferta.");
  }

  return data;
};
