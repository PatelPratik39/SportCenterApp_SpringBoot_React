import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Box, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Product } from "../../app/models/products";
import { Add, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";


const BasketPage = () => {


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

    // Function to format the price with INR currency symbol
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(price);
    };
    // if (!basket || basket.items.length === 0) return <Typography variant="h3">Your basket is empty. Please add few items!!!</Typography>
    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Image</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Subtotal</TableCell>
                            <TableCell>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow >
                            <TableCell>

                                <img src={"/images/products/"} alt="Product" width="50" height="50" />

                            </TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>$0.00</TableCell>
                            <TableCell>
                                <IconButton color='error' >
                                    <Remove />
                                </IconButton>
                                <IconButton color='error' >
                                    <Add />
                                </IconButton>
                            </TableCell>
                            <TableCell>0</TableCell>
                            <TableCell>
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={2} p={2} bgcolor="background.paper" borderRadius={4}>
                {/* <BasketSummary /> */}
                <Button
                    component={Link}
                    to='/checkout'
                    variant='contained'
                    size='large'
                    fullWidth
                >
                    Checkout
                </Button>
            </Box>
        </>
    )
}

export default BasketPage