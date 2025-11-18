import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { propertyService } from '@/api/propertyService'; 
import { useApi } from '@/hooks/useApi'; 
import type { PropertyDto } from '@/types/property.types';


export const PropertyDetailsPage: React.FC = () => {

  const { id } = useParams<{ id: string }>();

  const [
    propertyState,
    getProperty
  ] = useApi<PropertyDto, [number]>(propertyService.getPropertyById);

  const { data: property, isLoading, error } = propertyState;


  useEffect(() => {
    const propertyId = Number(id);
    
    if (!isNaN(propertyId)) {
      getProperty(propertyId);
    }
  }, [id, getProperty]);


  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <p>Cargando detalles de la propiedad...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-600">
        <h1 className="text-2xl font-bold">Error al cargar la propiedad</h1>
        <p>{error.message}</p>
      </div>
    );
  }


  if (!property) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Propiedad no encontrada</h1>
        <p>No pudimos encontrar los detalles para esta propiedad.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
        {property.imageUrls.length > 0 ? (
          property.imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Imagen ${index + 1} de ${property.title}`}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          ))
        ) : (
          <img
            src="https://via.placeholder.com/800x400?text=Sin+Imagen"
            alt="Sin imagen"
            className="w-full h-64 object-cover rounded-lg shadow-md md:col-span-2"
          />
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{property.location}</p>
        
        <p className="text-4xl font-light text-blue-600 mb-6">
          ${property.price.toLocaleString('es-CO')}
        </p>

        <h2 className="text-2xl font-semibold mb-3">Descripción</h2>
        <p className="text-gray-700 leading-relaxed">
          {property.description}
        </p>

        <button className="mt-6 w-full bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600">
          Contactar al Agente
        </button>
      </div>
    </div>
  );
};