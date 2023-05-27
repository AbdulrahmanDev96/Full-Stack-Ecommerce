import { AccountCircle, Login, PersonAdd } from '@mui/icons-material';
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Menu } from '@mui/material';
import { NavLink } from 'react-router-dom';
import SingedInMenu from '../SignedInMenu';

import { useAppSelector } from '../../store/configureStore';
import React from 'react';
import UserMenu from '../userbox/UserMenu';

const rightLink = [
  {title: "login", path: "/login", icon: <Login />},
  {title: "register", path: "/register", icon: <PersonAdd />},
];

export default function AccountIcon() {
  const {user} = useAppSelector(state => state.account)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <>
      <IconButton size='large' edge='end' color='inherit' onClick={handleClick}>
        <AccountCircle/>
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {user ? (
          <UserMenu/>
        ) : (
          <List sx={{display: "flex", flexDirection: "column", p: 0}}>
            {rightLink.map(({title, path, icon}) => (
              <ListItem 
                key={path}
                component={NavLink} 
                to={path}
                onClick={handleClose}
                sx={{textTransform: "capitalize"}}
              >
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            ))}
          </List>
        )}
      </Menu>
    </>
  )
}