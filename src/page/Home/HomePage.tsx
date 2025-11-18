import React, { useEffect } from 'react';
import { useApi } from '@/hooks/useApi'; 
import type { PropertyDto } from '@/types/property.types'; 
import { propertyService, type PropertyFilterParams } from '@/api/propertyService';
import { PropertyCard } from '@/components/property/PropertyCard';

export const HomePage: React.FC = () => {

const [
    propertiesState,
    getProperties
  ] = useApi<PropertyDto[], [PropertyFilterParams?]>(
    propertyService.getAllProperties
  );


  const { data: properties, isLoading, error } = propertiesState;


useEffect(() => {
    getProperties();
  }, [getProperties]);

  if (isLoading) {
    return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Propiedades Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties && properties.length > 0 ? (
          properties.map((property) => (
            
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p>No se encontraron propiedades disponibles.</p>
        )}
      </div>
    </div>
  );
};


  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-600">
        <h1 className="text-2xl font-bold">Error al cargar propiedades</h1>
        <p>{error.message}</p>
        
        
        {error.message.includes('401') && (
          <p className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded">
            <strong>Recordatorio:</strong> Si ves un error 401 (No Autorizado),
            recuerda que el endpoint 'GetAll' en el backend está protegido
            solo para 'Admins'.
          </p>
        )}
      </div>
    );
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Propiedades Disponibles</h1>
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties && properties.length > 0 ? (
          properties.map((property) => (

            <div key={property.id} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{property.title}</h2>
              <p className="text-gray-700">{property.location}</p>
              <p className="text-lg font-bold">${property.price.toLocaleString()}</p>

              {property.imageUrls && property.imageUrls.length > 0 && (
                <img 
                  src={property.imageUrls[0]} 
                  alt={property.title} 
                  className="w-full h-48 object-cover mt-2 rounded"
                />
              )}
            </div>
          ))
        ) : (
          <p>No se encontraron propiedades disponibles.</p>
        )}
      </div>
    </div>
  );
};