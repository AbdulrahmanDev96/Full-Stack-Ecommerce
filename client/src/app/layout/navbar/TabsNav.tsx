import { AppBar, Container, List, ListItem, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/configureStore";



export default function TabsNav() {
  const [pageTab , setPageTab] = useState(0);
  const {user} = useAppSelector(state => state.account)

  return(
    <>
      <AppBar position="sticky">
        <Container>
          <Tabs variant="scrollable" scrollButtons='auto'
          textColor="inherit" indicatorColor="secondary" value={pageTab}
          onChange={(e, newValue) => setPageTab(newValue)}>
            <Tab sx={{ textTransform: 'capitalize'}} label="Product" component={Link} to="/catalog" />
            <Tab sx={{ textTransform: 'capitalize'}} label="About" component={Link} to="/about" />
            <Tab sx={{ textTransform: 'capitalize'}} label="Contact" component={Link} to="/contact" />
            <List>
            {user && user.roles?.includes('Admin') &&
            <ListItem component={NavLink} 
              to={'/inventory'}>
              Inventory
            </ListItem>}
            </List>
          </Tabs>
        </Container>
      </AppBar>
    </>
  )
}