import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(3, "Título mínimo 3 caracteres"),
  description: z.string().min(10, "Descripción mínima 10 caracteres"),
  price: z.number().min(0, "Precio inválido"),
  location: z.string().min(3, "Ubicación obligatoria"),
  images: z.any().optional(),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;
