// Configuración de la URL de la API
// En desarrollo usa localhost, en producción usa la variable de entorno
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper para construir URLs de API
export const getApiUrl = (endpoint) => {
  // Asegurar que el endpoint comience con /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_URL}${normalizedEndpoint}`;
};

export default API_URL;
