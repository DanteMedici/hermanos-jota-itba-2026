import { API_URL } from "../config/api";

// Obtiene el catálogo de productos desde la API
export async function obtenerProductos() {
  const response = await fetch(`${API_URL}/productos`);

  if (!response.ok)
    throw new Error(`Error al obtener productos: ${response.status}`);

  const { data } = await response.json();
  return data;
}