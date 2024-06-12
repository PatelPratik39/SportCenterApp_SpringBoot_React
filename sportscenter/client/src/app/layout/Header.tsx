import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}


const Header = ({ darkMode, handleThemeChange }: Props) => {
    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6"> Sports Center App </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header
