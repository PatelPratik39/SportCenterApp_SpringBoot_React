import {  Container, CssBaseline } from "@mui/material";
// import Catalog from "../../feature/catalog/Catalog";
import Header from "./Header";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
    }
  })
  function handleThemeChange() {
    setDarkMode(!darkMode)
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container sx={{ paddingTop: "79px" }}>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
