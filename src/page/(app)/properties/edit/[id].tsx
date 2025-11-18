import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import PropertyForm from "@/components/PropertyForm";
import { propertyService } from "@/services/properties";
import type { PropertyDto } from "@/types/property.types";
import type { PropertyFormValues } from "@/schemas/property.schema";

export default function EditProperty() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<PropertyDto | null>(null);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const data = await propertyService.getById(Number(id));
        setItem(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  const handleSubmit = async (
    values: PropertyFormValues,
    files?: File[]
  ) => {
    try {
      let imageUrls = item?.imageUrls ?? [];

      if (files && files.length) {
        const uploaded = await propertyService.uploadImages(files);
        imageUrls = [...imageUrls, ...uploaded];
      }

      await propertyService.update(Number(id), { ...values, imageUrls });
      navigate("/app/properties");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar");
    }
  };

  if (!item) return <div className="p-4">Cargando...</div>;

  return (
    <PropertyForm
      initialValues={item}
      onSubmit={handleSubmit}
      submitLabel="Actualizar"
    />
  );
}
