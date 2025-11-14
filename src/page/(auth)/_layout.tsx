import HeaderAuth from "@/components/blocks/header_auth";
import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function AuthLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (!pathname.split("/")[2]) {
      navigate("/auth/login");
    }
  }, [pathname]);

  return (
    <div>
      <HeaderAuth />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
