import { useAuth } from "@/hooks/useAuth";
import * as React from "react";
import { Outlet, useNavigate } from "react-router";

export default function AppLayout() {
  const navigate = useNavigate();
  const { account } = useAuth();

  React.useEffect(() => {
    if (!account) navigate("/auth/login");
  }, [account]);

  return (
    <div>
      Bienvenido, {account?.email.split("@")[0]}
      <Outlet />
    </div>
  );
}
