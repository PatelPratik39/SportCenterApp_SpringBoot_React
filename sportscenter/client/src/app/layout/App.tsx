import { Container, CssBaseline } from "@mui/material";
import Catalog from "../../feature/catalog/Catalog";
import Header from "./Header";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";


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
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container sx={{ paddingTop: "79px" }}>
          <Catalog />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
