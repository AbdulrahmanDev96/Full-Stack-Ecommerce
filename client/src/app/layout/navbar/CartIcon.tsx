import { ShoppingCart} from "@mui/icons-material";
import {Badge, IconButton} from "@mui/material";
import { styled } from '@mui/material/styles';
import { useAppSelector } from "../../store/configureStore";
import { Link } from "react-router-dom";


const StyledBadge = styled(Badge)(({theme}) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    animation: 'pulse 2s infinite',
  },
  '@keyframes pulse': {
    '0%': { boxShadow: '0 0 0 0 rgba(0,0,0, 0.3)' },
    '70%': { boxShadow: '0 0 0 8px rgba(0,0,0, 0)' },
    '100%': { boxShadow: '0 0 0 0 rgba(0,0,0, 0)' },
  },
}));

export default function CartIcon() {
  const {basket} = useAppSelector(state => state.basket);
  const itemCount = basket?.items.reduce((sum, item ) => sum + item.quantity, 0)

  return (
    <>
      <IconButton component={Link} to='basket' size="large" edge="start" color="inherit" sx={{ml: 1}}>
        <ShoppingCart />
        <StyledBadge badgeContent={itemCount} color="secondary"/>
      </IconButton>
    </>
  );
}
