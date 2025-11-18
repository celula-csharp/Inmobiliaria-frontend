import { createBrowserRouter, redirect } from "react-router";
import AppLayout from "./page/(app)/_layout";
import AuthLayout from "./page/(auth)/_layout";
import Login from "./page/(auth)/login";
import Register from "./page/(auth)/register";
import Dashboard from "@/page/(app)/dashboard";
import PropertiesList from "@/page/(app)/properties";
import CreateProperty from "@/page/(app)/properties/create";
import EditProperty from "@/page/(app)/properties/edit/[id]";

const Routes = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/auth"),
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        index: true, 
        element: <Dashboard />,
      },
      { 
        path: "dashboard", 
        element: <Dashboard />,
      },
      { 
        path: "properties", 
        element: <PropertiesList />,
      },
      { 
        path: "properties/create", 
        element: <CreateProperty />, 
      },
      { 
        path: "properties/edit/:id", 
        element: <EditProperty /> 
      },
    ]
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
