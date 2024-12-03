
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Components/ErrorPage";
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
            }
        ]
    },
]);

export default router;