// import Catalog from "../../features/catalog/Catalog";
import {createTheme, Container, CssBaseline} from "@mui/material";
import Header from "./Header";
import {ThemeProvider} from "@emotion/react";
import {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const {setBasket} = useStoreContext();
  const [loading , setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId')
    if(buyerId){
      agent.Basket.get()
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  },[setBasket])


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

  if(loading) return <LoadingComponent message="Initialising app..."/>

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Header darkMood={darkMood} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
