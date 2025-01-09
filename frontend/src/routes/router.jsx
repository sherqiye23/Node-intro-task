import AddPage from "../pages/Add Page";
import CarsLayout from "../pages/CarsLayout";
import DetailPage from "../pages/Detail Page";
import HomePage from "../pages/Home Page";

const ROUTES = [
    {
        path: "/",
        element: <CarsLayout/>,
        children: [
            {
                path: "",
                element: <HomePage/>
            },
            {
                path: "add",
                element: <AddPage/>
            },
            {
                path: "detail/:id",
                element: <DetailPage/>
            },
        ]
    }
]

export default ROUTES
