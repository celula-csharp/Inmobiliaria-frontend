// import { api } from "@/services";

import type { Login } from "@/types";

export const login = async (login: Login) => {
  // const response = await api.post("/auth/login");

  // console.log(response);

  console.log(
    `Iniciaste en ${login.email} con la contraseña ${login.password}`
  );

  return {
    email: login.email,
    id: 1,
  };
};
