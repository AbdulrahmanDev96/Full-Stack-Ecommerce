import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from "react-router-dom";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import InfoIcon from '@mui/icons-material/Info';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';

export const mainListItems = (
  <>
  <ListItemButton component={Link} to="/">
      <ListItemIcon >
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboard">
      <ListItemIcon >
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/inventory">
      <ListItemIcon >
        <InventoryIcon />
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItemButton>
    <ListItemButton component={Link} to="/catalog">
      <ListItemIcon>
        <ProductionQuantityLimitsIcon />
      </ListItemIcon>
      <ListItemText primary="Product" />
    </ListItemButton>
    <ListItemButton component={Link} to="/about">
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItemButton>
    <ListItemButton  component={Link} to="/contact">
      <ListItemIcon>
        <ConnectWithoutContactIcon />
      </ListItemIcon>
      <ListItemText primary="Contact" />
    </ListItemButton>
  </>
);

