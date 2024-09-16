import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ErrorFallback } from "./components/ErrorFallback";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorFallback />,
    children: [
      { path: "/", lazy: () => import("./pages/Home") },
      {
        path: "/auth",
        lazy: () => import("./features/auth/layouts/AuthFormWrapper"),
        children: [
          { path: "login", lazy: () => import("./pages/Login") },
          { path: "signup", lazy: () => import("./pages/SignUp") },
        ],
      },
    ],
  },
]);
