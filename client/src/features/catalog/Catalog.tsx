import {Container, Grid,Stack, Typography} from "@mui/material";
import ProductList from "./ProductList";
import LoadingComponent from "./../../app/layout/LoadingComponent";
import {useAppDispatch} from "../../app/store/configureStore";
import { setPageNumber} from "./catalogSlice";
// import ProductSearch from "./ProductSearch";
import AppPagination from "../../app/components/AppPagination";
import useProduct from "../../app/hooks/useProduct";
import { useState } from "react";
import ProductFilterSidebar from "../../sections/productfilter/ProductFilterSidebar";
import ProductSort from "../../sections/productfilter/ProductSort";


export default function Catalog() {
  const {products, filtersLoaded, metaData } = useProduct();
  const dispatch = useAppDispatch();
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };


  if (!filtersLoaded) return <LoadingComponent message="loading Product..." />;

  
  return (
    <>
      <Container >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter} icon={""} />
            <ProductSort />
          </Stack>
        </Stack>
      
        <ProductList products={products} />
      </Container>
      
      <Grid item xs={12} sm={9} sx={{ my: 5 }} >
        {metaData && 
        <AppPagination
        metaData={metaData}
        onPageChang={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
        />}
      </Grid>
    </>
  );
}
