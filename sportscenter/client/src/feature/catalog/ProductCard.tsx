
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from '../../app/models/products';
import { useTheme } from "@mui/material/styles";

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    // adding this styling that can change the Avtar tag to secondary color when user change the screen to dark mode
    const theme = useTheme();
    const avatarColor = theme.palette.mode === 'dark' ? 'secondary.main' : 'primary.main';


    const extractImageName = (item: Product): string | null => {
        if (item && item.pictureUrl) {
            const parts = item.pictureUrl.split('/');
            if (parts.length > 0) {
                return parts[parts.length - 1];
            }
        }
        return null;
    }
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-In', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        }).format(price);
    }


    return (
        <>
            <Card>
                <CardHeader avatar={
                    <Avatar sx={{ bgcolor: avatarColor }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                    title={product.name}
                    titleTypographyProps={{ sx: { fontWeight: 'bold', color: 'primary.main' } }}
                />
                <CardMedia
                    sx={{ height: 140, backgroundSize: 'contain' }}
                    image={"/images/products/" + extractImageName(product)}
                    title={product.name}
                />
                <CardContent>
                    <Typography gutterBottom color='secondary' variant="h5">
                        {formatPrice(product.price)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.productBrand} / {product.productType}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Add to Cart</Button>
                    <Button size="small">View</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default ProductCard;
