import { AppBar, Toolbar, Typography } from "@mui/material"


const Header = () => {
    return (
        <>
            <AppBar position="static" sx={{ mb: 4 }}>
                <Toolbar>
                    <Typography variant="h6"> Sports Center App </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header
