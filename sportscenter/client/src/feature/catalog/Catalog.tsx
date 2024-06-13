import { useState, useEffect } from "react";
import { Product } from "../../app/models/products"
import ProductList from "./ProductList";
import api from "../../app/api/api";
import Spinner from "../../app/layout/Spinner";

const Catalog = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);


    // useEffect(() => {
    //     fetch("http://localhost:8080/api/products")
    //         .then((response) => response.json())
    //         .then((data) => setProducts(data.content));
    // }, []);

    useEffect(() => {
        api.Store.list()
            .then((products) => setProducts(products.content))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [])
    if (loading) return <Spinner message="Loading Products ....." />

    if (!products) return <h3>Unable to Load Products </h3>
    return (
        <>
            <ProductList products={products} />
        </>
    )
}

export default Catalog