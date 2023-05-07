// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

import {Autoplay, Pagination, Navigation} from "swiper";


export default function HomePage() {
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
    </>
  );
}
