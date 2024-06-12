import { createBrowserRouter } from "react-router-dom"
import App from "../layout/App"
import Home from "../../feature/home/Home"
import Catalog from "../../feature/catalog/Catalog"
import ContactPage from "../../feature/contect/ContactPage"
import ProductDetails from "../../feature/catalog/ProductDetails"

export const router = createBrowserRouter([

    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Home /> },
            { path: 'store', element: <Catalog /> },
            { path: 'store/:id', element: <ProductDetails /> },
            { path: 'contact', element: <ContactPage /> },
        ]
    }
])
