import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getRecommendations,
  getNewReleases,
  getReleasesLoadingState,
} from "../../redux/selectors";
import { fetchNewReleases } from "../../redux/releasesSlice";
import { useAppDispatch } from "../../store";
import { Carousel } from "../../components/carousel";

import styles from "./index.module.scss";
import { fetchRecommendations } from "../../redux/recommendationsSlice";
import { Loader } from "../../components/loader";
import { Player } from "../../components/player";
import SpotifyPlayer from "react-spotify-web-playback";
import { getTokenFromCookie } from "../../spotify";

export const Main = () => {
  const dispatch = useAppDispatch();
  const releases = useSelector(getNewReleases);
  const recommendations = useSelector(getRecommendations);
  const isLoading = useSelector(getReleasesLoadingState);

  useEffect(() => {
    dispatch(fetchNewReleases());
    dispatch(fetchRecommendations());
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* {recommendations || releases && <Carousel  albums={releases.albums.items} />} */}
      <h2>New releases</h2>
      {releases && <Carousel albums={releases.albums.items} />}
      {isLoading && <Loader />}
      {/* <Player /> */}

      {/* <SpotifyPlayer
        token={getTokenFromCookie()}
        uris={["spotify:album:6Fto97eXkutUmTGMM5wHfg"]}
      /> */}
    </div>
  );
};
