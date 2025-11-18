import React from 'react';
import type { PropertyDto } from '@/types/property.types';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: PropertyDto;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {

  const imageUrl = property.imageUrls && property.imageUrls.length > 0
    ? property.imageUrls[0]
    : 'https://via.placeholder.com/400x300?text=Sin+Imagen';

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <img
        src={imageUrl}
        alt={`Imagen de ${property.title}`}
        className="w-full h-56 object-cover"
      />

      
      <div className="p-4">
        
        <h3 className="text-xl font-semibold mb-1 truncate">
          {property.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          {property.location}
        </p>

        
        <p className="text-2xl font-bold text-blue-600 mb-4">
          ${property.price.toLocaleString('es-CO')}
        </p>
        
        
        <div className="flex justify-between items-center">
        <Link
            to={`/app/properties/${property.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center">
            Ver Detalles
        </Link>

        <button className="text-blue-500 hover:underline">
            Contactar
        </button>
        </div>
      </div>
    </div>
  );
};