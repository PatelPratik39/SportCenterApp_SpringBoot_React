import { useNavigate } from "react-router-dom"
import { Container, Paper, Box, Typography, Button } from "@mui/material";

const NotFoundError = () => {

    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    }

    return (
        <>
            <Container component={Paper} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    component="img"
                    sx={{
                        height: 'auto',
                        width: '100%',
                        maxHeight: { xs: 233, md: 600 },
                        maxWidth: { xs: 350, md: 600 },
                        mb: 4,
                    }}
                    src="/images/PageNotFound.jpg"
                    alt="404 Not Found"
                />
                <Typography variant="h4" component="h1" gutterBottom>
                    Oops! Page not found.
                </Typography>
                {/* <Typography variant="subtitle1" gutterBottom>
                Page not present
                </Typography> */}

                <Button variant="contained" color="primary" onClick={handleGoHome}>
                    Go Home
                </Button>
            </Container>
        </>
    )
}

export default NotFoundError