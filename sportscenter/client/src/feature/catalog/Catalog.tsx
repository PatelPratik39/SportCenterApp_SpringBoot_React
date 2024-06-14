import { useState, useEffect } from "react";
import { Product } from "../../app/models/products"
import ProductList from "./ProductList";
import api from "../../app/api/api";
import Spinner from "../../app/layout/Spinner";
import { Grid, Paper, TextField } from "@mui/material";

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
            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <Paper sx={{ mb: 2 }}>
                        <TextField
                            label="Search products"
                            variant="outlined"
                            fullWidth
                            // value={searchTerm}
                            // onChange={(e) => setSearchTerm(e.target.value)}
                            // onKeyDown={(e) => {
                            //     if (e.key === 'Enter') {
                            //         // Trigger search action
                            //         loadProducts(selectedSort, searchTerm); // Pass the search term to loadProducts
                            //     }
                            // }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <ProductList products={products} />
                </Grid>

            </Grid>
        </>
    )
}

export default Catalog