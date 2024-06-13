
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from '../../app/models/products';
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";


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
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2
        }).format(price);
    }

    const titleLength = (title:string, maxLength:number): string => {
        if(title.length <= maxLength){
            return title;
        }
        return title.slice(0, maxLength) + '...';
    }



    return (
        <>
            <Card>
                <CardHeader avatar={
                    <Avatar sx={{ bgcolor: avatarColor }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                    title={titleLength(product.name,40)}
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
                    <Button component = {Link} to= {`/store/${product.id}`} size="small">View</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default ProductCard;
