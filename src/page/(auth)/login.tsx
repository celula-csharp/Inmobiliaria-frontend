import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas";
import type { LoginFormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function Login() {
  const [showPass, setShowPass] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <div className="w-full max-w-md mx-auto border p-5 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="text-2xl! mb-6">Iniciar sesión</FieldLegend>
            <Field>
              <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
              <Input id="email" placeholder="Correo" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <Input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Contraseña"
                {...register("password")}
              />

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                onCheckedChange={(checked) => setShowPass(Boolean(checked))}
                id="show-password"
                checked={showPass}
              />
              <FieldLabel htmlFor="show-password" className="font-normal">
                Mostrar contraseñas
              </FieldLabel>
            </Field>
          </FieldSet>
          <FieldSet>
            <Button type="submit">Iniciar sesión</Button>
            <FieldDescription className="flex flex-col justify-center items-center gap-3">
              ¿No tienes una cuenta?
              <Button variant="outline" className="no-underline!" asChild>
                <Link to="/auth/register">Registrate</Link>
              </Button>
            </FieldDescription>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
