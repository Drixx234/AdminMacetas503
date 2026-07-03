const API = "http://localhost:4000/api";

// Listar todas las órdenes
export const getOrders = async () => {

  const response = await fetch(`${API}/orders`, {

    method: "GET",

    credentials: "include"

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudieron obtener las órdenes.");
  }

  return data;
};

// Cambiar el estatus de una orden
// status debe ser uno de: "Pendiente", "Aceptado", "En proceso", "Completo", "Rechazado"
export const updateOrderStatus = async (id, status) => {

  const response = await fetch(`${API}/orders/${id}/status`, {

    method: "PATCH",

    headers: {
      "Content-Type": "application/json"
    },

    credentials: "include",

    body: JSON.stringify({ status })

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo actualizar el estatus de la orden.");
  }

  return data;
};

// Eliminar una orden
export const deleteOrder = async (id) => {

  const response = await fetch(`${API}/orders/${id}`, {

    method: "DELETE",

    credentials: "include"

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo eliminar la orden.");
  }

  return data;
};
