// ** MUI Imports
import { Button, Menu, Fade, MenuItem, Box } from "@mui/material";

// ** Functionality Imports
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";
import { Link } from 'react-router-dom';

// ** Icons Imports
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function SingedInMenu() {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.account)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


const styles = {
  width: '100%',
  display: 'flex',
  color: 'text.primary',
  textDecoration: 'none',
  '& svg': {
    fontSize: '1.375rem',
    color: 'text.secondary'
  }
}

  return (
    <>
      <Button
        color='inherit'
        onClick={handleClick}
        sx={{typography: 'h6'}}
        >{user?.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <Box sx={styles}>
            <PersonOutlineIcon sx={{ marginRight: 2 }}/>
            Profile
          </Box>
          </MenuItem>
        <MenuItem component={Link} to="/orders">
          <Box sx={styles}>
            <AccountBalanceWalletIcon sx={{ marginRight: 2 }}/>
            My orders
          </Box>
        </MenuItem>
        <MenuItem sx={{ py: 2 }} onClick={() => {
          dispatch(signOut())
          dispatch(clearBasket())
        }}>
          <ExitToAppIcon sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}