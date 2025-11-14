import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./context/authContext.tsx";
import "./index.css";
import Routes from "./routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Routes} />
    </AuthProvider>
  </StrictMode>
);
