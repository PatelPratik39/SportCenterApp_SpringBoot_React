import {  Container, CssBaseline } from "@mui/material";
// import Catalog from "../../feature/catalog/Catalog";
import Header from "./Header";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getBasketFromLocalStorage } from "../util/utils";
import { useAppDispatch } from "../store/ConfigureStores";
import { fetchCurrentUser } from "../../feature/account/accountSlice";
import api from "../api/api";
import { setBasket } from "../../feature/basket/basketSlice";
import Spinner from "./Spinner";


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const dispatch = useAppDispatch();

  const[loading, setLoading] = useState(true);

  useEffect(() => {
    const basket = getBasketFromLocalStorage();
    dispatch(fetchCurrentUser());
    if(basket){
      api.Basket.get()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
    } else {
      setLoading(false)
    }
  },[])

  const theme = createTheme({
    palette: {
      mode: paletteType,
    }
  })
  function handleThemeChange() {
    setDarkMode(!darkMode)
  }

  if(loading) return <Spinner message="Getting Basket...."/>
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
