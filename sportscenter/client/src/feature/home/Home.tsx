import { Typography, Box, Grid, Paper } from "@mui/material";


const Home = () => {
    // const url = '../../../public/images/sports-cenetr-logo.png'
    return (
        <Grid container sx={{ minHeight: '100vh' }}>
            <Grid item xs={12} md={6} sx={{ backgroundImage: 'url(../../../public/images/sports-cenetr-logo.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {/* Left side with the HD image */}
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Right side with website information */}
                <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, margin: 'auto' }}>
                    <Typography variant="h2" gutterBottom>Sports-Center E-commerce App</Typography>
                    <Typography variant="h4" gutterBottom>About App</Typography>
                    <Typography variant="body1" paragraph>
                        Welcome to the Sports Center application. I have created this App using Java Spring boot, react, Mysql and docker
                    </Typography>
                    <Typography variant="h4" gutterBottom>Tech Stack</Typography>
                    <Typography variant="body1" paragraph>
                        Our platform is built using the latest technologies:
                    </Typography>
                    <ul>
                        <li><Typography variant="body1">Java Spring Boot</Typography></li>
                        <li><Typography variant="body1">TypeScript</Typography></li>
                        <li><Typography variant="body1">Material UI</Typography></li>
                        <li><Typography variant="body1">Swagger UI</Typography></li>
                        <li><Typography variant="body1">MySQL</Typography></li>
                        <li><Typography variant="body1">Docker</Typography></li>
                    </ul>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Home;

