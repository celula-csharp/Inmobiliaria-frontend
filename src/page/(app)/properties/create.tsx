import { useNavigate } from "react-router";
import PropertyForm from "@/components/PropertyForm";
import { propertyService } from "@/services/properties";
import type { PropertyFormValues } from "@/schemas/property.schema";


export default function CreateProperty() {
  const navigate = useNavigate();

  const handleSubmit = async (values: PropertyFormValues, files?: File[]) => {
    try {
      let imageUrls: string[] = [];
      if (files && files.length) {
        imageUrls = await propertyService.uploadImages(files);
      }
      await propertyService.create({ ...values, imageUrls });
      navigate("/app/properties");
    } catch (err) {
      console.error(err);
      alert("Error al crear propiedad");
    }
  };

  return <PropertyForm onSubmit={handleSubmit} submitLabel="Crear propiedad" />;
}
