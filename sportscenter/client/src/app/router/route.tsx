import { Navigate, createBrowserRouter } from "react-router-dom"
import App from "../layout/App"
import Home from "../../feature/home/Home"
import Catalog from "../../feature/catalog/Catalog"
import ContactPage from "../../feature/contect/ContactPage"
import ProductDetails from "../../feature/catalog/ProductDetails"
import NotFoundError from "../errors/NotFoundError"
import ServerError from "../errors/ServerError"
import BasketPage from "../../feature/basket/BasketPage"


export const router = createBrowserRouter([

    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Home /> },
            { path: 'store', element: <Catalog /> },
            { path: 'store/:id', element: <ProductDetails /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'cart', element: <BasketPage /> },
            { path: '/not-found', element: <NotFoundError /> },
            { path: '/server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    }
])
