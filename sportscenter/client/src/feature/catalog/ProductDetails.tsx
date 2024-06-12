import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
// import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../../app/models/products';
import api from "../../app/api/api";
import NotFoundError from "../../app/errors/NotFoundError";



const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>();
  const [loading, setLoading] = useState(true);
  

  // Define the extractImageName function
  const extractImageName = (item: Product): string | null => {
    if (item && item.pictureUrl) {
      const parts = item.pictureUrl.split('/');
      if (parts.length > 0) {
        return parts[parts.length - 1];
      }
    }
    return null;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(price);
  };

  useEffect(() => {
    id && api.Store.details(parseInt(id)) 
      .then(response => setProduct(response))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <h3>Loading product ..... </h3>

  if (!product) return <NotFoundError />

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <img src={"/images/products/" + extractImageName(product)} alt={product.name} style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h3'>{product.name}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography gutterBottom color='secondary' variant="h4">{formatPrice(product.price)}</Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell><b>Name : </b></TableCell>
                  <TableCell>{product.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><b>Description: </b></TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><b>Type : </b></TableCell>
                  <TableCell>{product.productType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><b>Brand : </b></TableCell>
                  <TableCell>{product.productBrand}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  )
}

export default ProductDetails