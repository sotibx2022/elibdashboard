import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/dashboard/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotfoundPage from "./pages/NotfoundPage";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import AuthLayout from "./pages/auth/AuthLayout";
import BooksPage from "./pages/dashboard/BooksPage";
import AddBookPage from "./pages/dashboard/AddBookPage";
export const Router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />, // Use DashboardLayout as a parent
    children: [
      {
        path: "", // Relative path to match /dashboard/home
        element: <HomePage />, // This will render inside the DashboardLayout
      },
      {
        path: "books", // Relative path to match /dashboard/home
        element: <BooksPage />, // This will render inside the DashboardLayout
      },
      {
        path: "books/add", // Relative path to match /dashboard/home
        element: <AddBookPage />, // This will render inside the DashboardLayout
      },
      {
        path: "books/:bookId", // Relative path to match /dashboard/home
        element: <AddBookPage />, // This will render inside the DashboardLayout
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
