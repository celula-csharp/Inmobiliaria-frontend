import { login as loginService } from "@/services/auth";
import type { Login } from "@/types";
import * as React from "react";

type Account = {
  id: string;
  email: string;
} | null;

type AuthContextType = {
  account: Account;
  login: (login: Login) => Promise<void>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = React.useState<Account>(null);

  const handleLogin = async (login: Login) => {
    try {
      const response = await loginService(login);

      setAccount({ ...response, id: String(response.id) });
    } catch (err) {
      console.error(err);
    }
  };

  console.log(account);

  return (
    <AuthContext.Provider value={{ account, login: handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
