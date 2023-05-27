// import Catalog from "../../features/catalog/Catalog";
// import { useStoreContext } from "../context/StoreContext";
import themeOptions from "../theme/theme";
import {Container, CssBaseline} from "@mui/material";
import { ThemeProvider } from '@mui/material';
import {useCallback, useEffect, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingComponent from "./LoadingComponent";
import {useAppDispatch} from "../store/configureStore";
import {fetchBasketAsync} from "../../features/basket/basketSlice";
import {fetchCurrentUser} from "../../features/account/accountSlice";
import HomePage from "../../features/home/HomePage";
import Navbar from "./navbar/Navbar";


function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  // const [darkMood, SetDarkMood] = useState(false);
  // const paletteType = darkMood ? "dark" : "light";
  // const theme = createTheme({
  //   palette: {
  //     mode: paletteType,
  //     background: {
  //       default: paletteType === "light" ? "#e3e6e6" : "#121212",
  //     },
  //   },
  // });

  // function handleThemeChange() {
  //   SetDarkMood(!darkMood);
  // }

  return (
    <ThemeProvider theme={themeOptions}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Navbar />
      {loading ? <LoadingComponent message="Initialising app..." />
        : location.pathname === "/" ?  <HomePage />
        : <Container sx={{mt: 5}}>
          <Outlet />
        </Container>}
    </ThemeProvider>
  );
}

export default App;
