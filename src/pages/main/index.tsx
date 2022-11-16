import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getNewReleases,
  getReleasesLoadingState,
} from "../../redux/selectors";
import { fetchNewReleases } from "../../redux/releasesSlice";
import { useAppDispatch } from "../../store";
import { Carousel } from "../../components/carousel";

import styles from "./index.module.scss";
import { fetchRecommendations } from "../../redux/recommendationsSlice";
import { Loader } from "../../components/loader";
import useAuth from "../../hooks/useAuth";
import SpotifyWebApi from 'spotify-web-api-node';



interface props {
  code: string;
}

export const Main = ({code}: props) => {
  
  const accessToken = useAuth(code);

  console.log(accessToken)
  const dispatch = useAppDispatch();
  const releases = useSelector(getNewReleases);
  console.log('releases', releases);
  
  // const recommendations = useSelector(getRecommendations);
  const isLoading = useSelector(getReleasesLoadingState);
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  });

  useEffect(() => {

    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    dispatch(fetchNewReleases());
    // dispatch(fetchRecommendations());
  }, [accessToken]);

  return (
    <div className={styles.wrapper}>
      {/* {recommendations || releases && <Carousel  albums={releases.albums.items} />} */}
      {releases && <Carousel albums={releases.albums.items} />}
      {isLoading && <Loader />}
      {/* <Player /> */}

       
    </div>
  );
};
