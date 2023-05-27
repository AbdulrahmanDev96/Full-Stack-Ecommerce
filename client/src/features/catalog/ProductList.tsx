import {Grid} from "@mui/material";
import {Product} from "../../app/models/Product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ShopProductCard from "./ShopProductCard";

interface Props {
  products: Product[];
}

export default function ProductList({products}: Props) {
  const {productsLoaded} = useAppSelector(state => state.catalog)
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item  xs={12} sm={6} md={4} key={product.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton/>
          ): (
            <ShopProductCard product={product} />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
