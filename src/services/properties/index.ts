import apiClient from "@/api/apiClient";
import type { PropertyDto } from "@/types/property.types";

export interface CreatePropertyDto {
  title: string;
  description: string;
  price: number;
  location: string;
  imageUrls?: string[];
}

const BASE = "/properties";

const getAll = async (): Promise<PropertyDto[]> => {
  const { data } = await apiClient.get<PropertyDto[]>(`${BASE}`);
  return data;
};

const getById = async (id: number): Promise<PropertyDto> => {
  const { data } = await apiClient.get<PropertyDto>(`${BASE}/${id}`);
  return data;
};

const create = async (payload: CreatePropertyDto): Promise<PropertyDto> => {
  const { data } = await apiClient.post<PropertyDto>(`${BASE}`, payload);
  return data;
};

const update = async (id: number, payload: Partial<CreatePropertyDto>) => {
  const { data } = await apiClient.put<PropertyDto>(`${BASE}/${id}`, payload);
  return data;
};

const remove = async (id: number) => {
  const { data } = await apiClient.delete(`${BASE}/${id}`);
  return data;
};

/**
 * Subida de imágenes: recibe FileList | File[] y devuelve array de URLs.
 * El endpoint backend debe aceptar multipart/form-data y devolver { urls: string[] }.
 */
const uploadImages = async (files: File[] | FileList): Promise<string[]> => {
  const form = new FormData();
  Array.from(files).forEach((f) => form.append("files", f));
  const { data } = await apiClient.post<{ urls: string[] }>(
    `${BASE}/upload-images`,
    form,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data.urls;
};

export const propertyService = {
  getAll,
  getById,
  create,
  update,
  remove,
  uploadImages,
};
