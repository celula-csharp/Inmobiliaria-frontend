import { createBrowserRouter, redirect } from "react-router";
import AppLayout from "./page/(app)/_layout";
import AuthLayout from "./page/(auth)/_layout";
import Login from "./page/(auth)/login";
import Register from "./page/(auth)/register";

const Routes = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/auth"),
  },
  {
    path: "app",
    element: <AppLayout />,
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default Routes;
