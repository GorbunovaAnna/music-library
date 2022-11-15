import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import "swiper/scss/autoplay";

interface props {
  albums: SpotifyApi.AlbumObjectSimplified[];
}
export const Carousel = (props: props) => {
  const navigate = useNavigate();

function clickHandler(url: string) {
  navigate(url);
}

  return (
    <div className={styles.wrapper}>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={5}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {props.albums?.map((el) => (
          <SwiperSlide key={el.id} >
            <div className={styles.slide}>
              <img src={el.images[1].url} alt="" />
              <p className={styles.name}>{el.name}</p>
              <p  className={styles.artist} onClick={() => clickHandler(`/artist/${el.artists[0].id}`)}>{el.artists[0].name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
