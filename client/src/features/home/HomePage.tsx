// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

import {Autoplay, Pagination, Navigation} from "swiper";
import { Container, Stack } from "@mui/material";
import {Grid} from "@mui/material";
import ProductFilterSidebar from "../../sections/productfilter/ProductFilterSidebar";
import ProductSort from "../../sections/productfilter/ProductSort";
import ProductList from "../catalog/ProductList";
import { useState } from "react";
import useProduct from "../../app/hooks/useProduct";
import { useAppDispatch } from "../../app/store/configureStore";
import { setPageNumber } from "../catalog/catalogSlice";
import AppPagination from "../../app/components/AppPagination";



export default function HomePage() {
  const {products, metaData } = useProduct();
  const dispatch = useAppDispatch();
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper">
        <SwiperSlide>
          <img src="/images/hero1.jpg" style={{display: 'block', width: '100%', maxHeight: 500}} alt="img1"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/hero2.jpg" style={{display: 'block', width: '100%', maxHeight: 500}} alt="img2"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/hero3.jpg" style={{display: 'block', width: '100%', maxHeight: 500}} alt="img3"/>
        </SwiperSlide>
      </Swiper>

      <Container  sx={{ my: 5 }}>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 2 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter} icon={""} />
            <ProductSort />
          </Stack>
        </Stack>
      
        <ProductList products={products} />

        <Grid item xs={12} sm={9} sx={{ my: 5 }} >
        {metaData && 
        <AppPagination
        metaData={metaData}
        onPageChang={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
        />}
      </Grid>
      
      </Container>
    </>
  );
}
