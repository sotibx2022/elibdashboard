import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotfoundPage from "./pages/NotfoundPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
export const Router = createBrowserRouter([
    {path:'/',
        element:<HomePage/>
    },
    {path:'/home',
        element:<HomePage/>
    },
    {path:'/login',
        element:<LoginPage/>
    },
    {path:'/register',
        element:<RegisterPage/>
    },
    {path:'*',
        element:<NotfoundPage/>
    },
    {
        path:"/forgetpassword",
    element:<ForgetPasswordPage/>
    }
])