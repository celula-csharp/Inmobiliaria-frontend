import type { PropertyDto } from '@/types/property.types';
import apiClient from './apiClient'; 

// --- Tipos para Peticiones y Respuestas ---

export interface PropertyFilterParams {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
}


export interface ContactFormData {
    propertyId: number;
    name: string;
    email: string;
    message: string;
}

export interface ContactFormData {
    propertyId: number;
    name: string;
    email: string;
    message: string;
}

const getAllProperties = async (params?: PropertyFilterParams): Promise<PropertyDto[]> => {
    try {
    const response = await apiClient.get<PropertyDto[]>('/PropertyControlle/GetAll', { params });
    return response.data;
    } catch (error) {
    console.error('Error al obtener las propiedades:', error);

    throw error; 
    }
};

const getPropertyById = async (id: number): Promise<PropertyDto> => {
    try {
    const response = await apiClient.get<PropertyDto>(`/PropertyControlle/${id}`);
    return response.data;
    } catch (error) {
    console.error(`Error al obtener la propiedad con ID ${id}:`, error);
    throw error;
    }
};

const sendContactRequest = async (data: ContactFormData): Promise<void> => {
    try {
    console.log('Simulando envío de contacto:', data);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return;

    } catch (error) {
    console.error('Error al simular el envío de contacto:', error);
    throw error;
    }
};

export const propertyService = {
    getAllProperties,
    getPropertyById,
    sendContactRequest,
};

