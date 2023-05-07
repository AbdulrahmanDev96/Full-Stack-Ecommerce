import {AppBar,List,ListItem,Switch,Toolbar,Typography,IconButton,Badge,Box} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import FlareIcon from "@mui/icons-material/Flare";
import {Link, NavLink} from "react-router-dom";
import {ShoppingCart} from "@mui/icons-material";
import { useAppSelector } from "../store/configureStore";
import SingedInMenu from "./SignedInMenu";

const midLink = [
  {title: "catalog", path: "/catalog"},
  {title: "about", path: "/about"},
  {title: "contact", path: "/contact"},
];

const rightLink = [
  {title: "login", path: "/login"},
  {title: "register", path: "/register"},
];

const navStyle = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

interface Props {
  darkMood: boolean;
  handleThemeChange: () => void;
}

export default function Header({darkMood, handleThemeChange}: Props) {
  const {basket} = useAppSelector(state => state.basket);
  const {user} = useAppSelector(state => state.account)
  const itemCount = basket?.items.reduce((sum, item ) => sum + item.quantity, 0)

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>

        <Box display='flex'alignItems='center'>
          <Typography variant="h6" component={NavLink} to="/" sx={navStyle}>
            A-Store
          </Typography>

          <Switch
            color="info"
            checkedIcon={<Brightness4Icon />}
            checked={darkMood}
            onChange={handleThemeChange}
            icon={<FlareIcon />}
          />
        </Box>

        <List sx={{display: "flex"}}>
          {midLink.map(({title, path}) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyle}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display='flex'alignItems='center'>
          <IconButton component={Link} to='basket' size="large" edge="start" color="inherit" sx={{mr: 2}}>
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          {user ? (
            <SingedInMenu/>
          ): (
            <List sx={{display: "flex"}}>
            {rightLink.map(({title, path}) => (
              <ListItem component={NavLink} 
                to={path} key={path} sx={navStyle}
                >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
