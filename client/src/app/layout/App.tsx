// import Catalog from "../../features/catalog/Catalog";
import {createTheme, Container, CssBaseline} from "@mui/material";
import Header from "./Header";
import {ThemeProvider} from "@emotion/react";
import {useState} from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [darkMood, SetDarkMood] = useState(false);
  const paletteType = darkMood ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#e3e6e6" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    SetDarkMood(!darkMood);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMood={darkMood} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
