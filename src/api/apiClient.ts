import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
    'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
    // Obtenemos el token guardado en el login 
    const token = localStorage.getItem('token');
    
    if (token) {
      // Si el token existe, lo añadimos a los headers
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    },
    (error) => {
    // Manejo de errores en la configuración de la petición
    return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
    return response;
    },
    (error) => {
    if (error.response && error.response.status === 401) {
        console.error('Error 401: No autorizado. Redirigiendo al login.');
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
    }
);

export default apiClient;

