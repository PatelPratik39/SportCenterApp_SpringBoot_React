import { Container, CssBaseline } from "@mui/material";
import Catalog from "../../feature/catalog/Catalog";
import Header from "./Header";

function App() {

  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Catalog />
      </Container>
    </>
  );
}

export default App;
