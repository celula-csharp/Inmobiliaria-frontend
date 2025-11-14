import type { loginSchema, registerSchema } from "@/schemas";
import type z from "zod";

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type Login = {
  email: string;
  password: string;
};
