import { useRef, useState } from 'react';

import { NavLink } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { signOut } from '../../../features/account/accountSlice'; 
import { clearBasket } from '../../../features/basket/basketSlice'; 

const UserBoxButton = styled(Button)(
  ({ theme }) => `
  padding-left: ${theme.spacing(1)};
  padding-right: ${theme.spacing(1)};
`
);


const UserBoxText = styled(Box)(
  ({ theme }) => `
  text-align: left;
  padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
  font-weight: ${theme.typography.fontWeightBold};
  color: ${theme.palette.secondary.main};
  display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
    color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);



function UserMenu() {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.account)

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const image = {
    avatar: '/images/avatars/1.jpg',
  };


  return (
    <>
    <Box>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" src={image.avatar}/>
          <UserBoxText>
            <UserBoxLabel variant="body1">Hi!</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user?.email}
            </UserBoxDescription>
          </UserBoxText>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem button to="/management/profile/details" component={NavLink}>
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary="My Profile" />
          </ListItem>
          <ListItem button to="/dashboards/messenger" component={NavLink}>
            <InboxTwoToneIcon fontSize="small" />
            <ListItemText primary="Messenger" />
          </ListItem>
          <ListItem
            button
            to="/orders"
            component={NavLink}
          >
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary="Account Settings" />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth 
          onClick={() => {
            dispatch(signOut())
            dispatch(clearBasket())
          }}
          >
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default UserMenu;
