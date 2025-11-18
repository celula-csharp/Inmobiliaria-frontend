import { useEffect, useState } from "react";
import { propertyService } from "@/services/properties";
import type { PropertyDto } from "@/types/property.types";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function PropertiesList() {
  const [items, setItems] = useState<PropertyDto[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const data = await propertyService.getAll();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = () => navigate("/app/properties/create");

  const handleEdit = (id: number) => navigate(`/app/properties/edit/${id}`);

  const handleDelete = async (id: number) => {
    const ok = window.confirm("¿Seguro que deseas eliminar esta propiedad?");
    if (!ok) return;
    try {
      await propertyService.remove(id);
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Propiedades</h2>
        <Button onClick={handleCreate}>Crear propiedad</Button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="grid gap-3">
          {items.map((p) => (
            <div key={p.id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-muted-foreground">{p.location} — ${p.price}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleEdit(p.id)}>Editar</Button>
                <Button variant="destructive" onClick={() => handleDelete(p.id)}>Eliminar</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
