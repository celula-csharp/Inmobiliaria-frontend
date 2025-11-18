import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema, type PropertyFormValues } from "@/schemas/property.schema";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldSet, FieldLegend, FieldGroup, FieldDescription } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useState } from "react";
type Props = {
  initialValues?: Partial<PropertyFormValues>;
  onSubmit: (values: PropertyFormValues, files?: File[]) => Promise<void> | void;
  submitLabel?: string;
};

export default function PropertyForm({ initialValues, onSubmit, submitLabel = "Guardar" }: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      price: (initialValues?.price as number) ?? 0,
      location: initialValues?.location ?? "",
    },
  });

  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const submit = async (data: PropertyFormValues) => {
    await onSubmit(data, files.length ? files : undefined);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-2xl mx-auto border p-4 rounded">
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="text-xl!">Propiedad</FieldLegend>

          <Field>
            <FieldLabel htmlFor="title">Título</FieldLabel>
            <Input id="title" {...register("title")} />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Descripción</FieldLabel>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <textarea id="description" {...field} className="w-full p-2 rounded border" rows={4} />}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </Field>

          <Field>
            <FieldLabel htmlFor="price">Precio</FieldLabel>
            <Input id="price" type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </Field>

          <Field>
            <FieldLabel htmlFor="location">Ubicación</FieldLabel>
            <Input id="location" {...register("location")} />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </Field>

          <Field>
            <FieldLabel htmlFor="images">Imágenes (múltiples)</FieldLabel>
            <input id="images" type="file" multiple onChange={handleFiles} />
            <FieldDescription>
              Selecciona varias imágenes. Se subirán al backend al enviar el formulario.
            </FieldDescription>
          </Field>
        </FieldSet>

        <FieldSet>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : submitLabel}
          </Button>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
