import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import OverView from "../pages/OverView/OverView";
import { routes } from "./routes";

const router = createBrowserRouter([
    {
        path: routes.home,
        element: <Home/>
    },
    {
        path: `${routes.overView}/:company/:id`,
        element: <OverView/>
    }
])

export default router