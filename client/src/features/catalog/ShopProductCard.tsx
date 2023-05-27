import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {Product} from "../../app/models/Product";
import { Link } from "react-router-dom";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync} from "../basket/basketSlice";
// import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { AddShoppingCart } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface Props {
  product: Product;
}

export default function ProductCard({product}: Props) {
  const {status} = useAppSelector(state => state.basket)
  const dispatch = useAppDispatch();

  return (
    <Card sx={{height: '100%', width: '100%', display: 'flex',
        flexDirection: 'column', position: 'relative'}}>
      <CardActionArea sx={{flexGrow: 1, height: 200}}>
      <CardMedia 
        sx={{height: 180, backgroundSize: "contain", bgcolor: "inherit"}}
        image={product.pictureUrl}
        title={product.name}
      />
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.name} / {product.brand}
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent: 'space-between'}}>
      <LoadingButton 
          loading={status ==='pendingAddItem' + product.id} 
          onClick={() => dispatch(addBasketItemAsync({productId: product.id}))} 
          size="large">{<AddShoppingCart />}</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`}  size="small">{<RemoveRedEyeIcon/>}</Button>
      </CardActions>
    </Card>
  );
}
