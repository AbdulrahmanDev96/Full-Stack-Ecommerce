import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Dialog, Stack } from '@mui/material';
import AccountIcon from './AccountIcon';
import CartIcon from './CartIcon';
import SearchForm from './SearchForm';
import { Search } from '@mui/icons-material';
import { mainListItems } from './listItems';
import { useState } from 'react';

const drawerWidth = 220;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const [searchOpen, setSearchOpen] = useState(false)
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box >
      <CssBaseline />
      <AppBar position="sticky" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          {/*Search Functionality start */}
          <Box sx={{display:{xs:'none', sm:'block'}}}>
            <SearchForm open={searchOpen} setOpen={setSearchOpen}/>
          </Box>
          <Box sx={{flexGrow:1}}/>
          <Stack gap={1} direction="row" alignContent='center' >
            <IconButton sx={{ display: { xs: 'inherit', sm: 'none' }, color: 'inherit' }}
            onClick={() => setSearchOpen(true)}>
              <Search />
            </IconButton>
            {/*Cart  */}
            <CartIcon />
            {/*Account  */}
            <AccountIcon/>
          </Stack>
        </Toolbar>
      </AppBar>
       {/*Search Functionality SmallScreen */}
    <Dialog
      open={searchOpen}
      onClose={() => setSearchOpen(false)}
      maxWidth="xs"
      PaperProps={{
        sx:{
          position: 'fixed',
          top:10
        }
      }}
      sx={{display:{xs:'block', sm: 'none'}}}>
    <SearchForm open={searchOpen} setOpen={setSearchOpen}/>
    </Dialog>
      <Drawer
        sx={{
          width: drawerWidth ,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List component="nav">
            {mainListItems}
          </List>
        <Divider />
      </Drawer>
    </Box>
  );
}