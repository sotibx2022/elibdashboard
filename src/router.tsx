import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotfoundPage from "./pages/NotfoundPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import DashboardLayout from "./pages/DashboardLayout";
import AuthLayout from "./pages/AuthLayout";
export const Router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />, // Use DashboardLayout as a parent
    children: [
      {
        path: "home", // Relative path to match /dashboard/home
        element: <HomePage />, // This will render inside the DashboardLayout
      },
    ],
  },
  {path:"/auth",
    element:<AuthLayout/>,
    children:[
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ]
  },
  {
    path: "/forgetpassword",
    element: <ForgetPasswordPage />,
  },
  {
    path: "*", // Catch-all for undefined routes
    element: <NotfoundPage />,
  },
]);
