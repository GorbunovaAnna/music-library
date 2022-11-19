import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import "swiper/scss/autoplay";
import { useAppDispatch } from "../../store";
import { addTrack } from "../../redux/playerSlice";
import { FiPlay } from "react-icons/fi";

interface props {
  albums: SpotifyApi.AlbumObjectSimplified[];
}
export const Carousel = (props: props) => {
  const [isActiveTrack, setIsActiveTrack] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function clickHandler(url: string) {
    navigate(url);
  }

  const setActive = (id: string) => {
    setIsActiveTrack(id);
  };

  const openTrack = (uri: string) => {
    dispatch(addTrack(uri));
  };

  return (
    <div className={styles.wrapper}>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={'auto'}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {props.albums?.map((el) => (
          <SwiperSlide className={styles.swiperSlide} key={el.id}>
            <div className={styles.slide} onClick={() => openTrack(el.uri)}
                onMouseEnter={() => setActive(el.id)}
                onMouseLeave={() => setActive("")}>
            { isActiveTrack === el.id && <div className={styles.playContainer}><FiPlay className={styles.trackIconPlay} onClick={() => openTrack(el.uri)}/></div>}
              <img
                src={el.images[1].url}
                alt=""
                
              />
              <p
                className={styles.name}
                onClick={() => clickHandler(`/album/${el.id}`)}
              >
                {el.name}
              </p>
              <p
                className={styles.artist}
                onClick={() => clickHandler(`/artist/${el.artists[0].id}`)}
              >
                {el.artists[0].name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

