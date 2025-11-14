import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string("Valor inválido.")
    .min(1, "El correo es obligatorio.")
    .email("Correo inválido"),
  password: z
    .string("Valor inválido.")
    .min(6, "Mínimo 6 caracteres.")
    .max(50, "Máximo 50 caracteres."),
});
