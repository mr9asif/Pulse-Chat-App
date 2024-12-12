
import { createBrowserRouter } from "react-router-dom";
import About from "../Components/About";
import ErrorPage from "../Components/ErrorPage";
import Login from "../Components/Login";
import Messages from "../Components/Messages";
import Register from "../Components/register";
import Root from "../Components/Root";
import Home from "../Home/Home";
import Privet from "../Utils/Privet";
import Protected from "../Utils/Protected";
 

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
                element:<Protected>
                <Register></Register>
                </Protected>
            },
            {
                path:'/login',
                element:<Protected>
                <Login></Login>
                </Protected>
            },
            {
                path:"/about",
                element:<About></About>
            },
            
        ]
    },
    {
        path:'/messages',
        element:<Privet>
        <Messages></Messages>
        </Privet>
    }
]);

export default router;