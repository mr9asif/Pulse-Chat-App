
import { createBrowserRouter } from "react-router-dom";
import About from "../Components/About";
import ErrorPage from "../Components/ErrorPage";
import Login from "../Components/Login";
import Register from "../Components/register";
import Root from "../Components/Root";
import Home from "../Home/Home";
 

const router = createBrowserRouter([
    {
        path:'/',
        errorElement:<ErrorPage></ErrorPage>,
        element:<Root></Root>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:"/about",
                element:<About></About>
            }
        ]
    },
]);

export default router;