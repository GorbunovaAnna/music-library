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
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from "../../hooks/useAuth";

interface props {
  code: string;
}

export const Main = ({code}: props) => {
 
  const accessToken = useAuth(code);
  console.log(accessToken)
  const dispatch = useAppDispatch();
  const releases = useSelector(getNewReleases);
  const recommendations = useSelector(getRecommendations);
  const isLoading = useSelector(getReleasesLoadingState);
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  });

  useEffect(() => {
    dispatch(fetchNewReleases());
    dispatch(fetchRecommendations());
    console.log('ssssss', spotifyApi.getAccessToken());
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* {recommendations || releases && <Carousel  albums={releases.albums.items} />} */}
      {releases && <Carousel albums={releases.albums.items} />}
      {isLoading && <Loader />}
      {/* <Player /> */}

       <SpotifyPlayer
        token={getTokenFromCookie()}
        uris={["spotify:track:2iekuoyleq7mwntvag3bil"]}
      />
    </div>
  );
};
