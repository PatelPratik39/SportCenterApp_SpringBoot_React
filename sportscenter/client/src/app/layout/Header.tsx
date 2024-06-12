import { AppBar, Box, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";


const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Store', path: '/store' },
    { title: 'Contact', path: '/contact' }
]

const accountLinks = [
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' },
]

const navStyle = {
    color: "inherit",
    typography: "h6",
    TextDecoration: "none",
    "&:hover": {
        color: "secondary.main"
    },
    "&:active": {
        color: "text.secondary"
    }
};



interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}


const Header = ({ darkMode, handleThemeChange }: Props) => {
    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Box display='flex' alignItems='center'>

                        <Typography variant="h6"> Sports Center App </Typography>
                        <Switch checked={darkMode} onChange={handleThemeChange} />
                    </Box>
                    <List sx={{ display: 'flex' }}>
                        {navLinks.map(({ title, path }) => (
                            <ListItem component={NavLink} to={path} key={path} sx={navStyle}>{title}</ListItem>
                        ))}
                    </List>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header
