import { AuthContext } from "@/context/authContext";
import React from "react";

export const useAuth = () => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext not found");

  return ctx;
};
