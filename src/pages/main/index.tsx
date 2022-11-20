import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getMyRecentlyPlayedTracks,
  getNewReleases,
  getReleasesLoadingState,
} from "../../redux/selectors";
import { fetchNewReleases } from "../../redux/releasesSlice";
import { useAppDispatch } from "../../store";
import { Carousel } from "../../components/carousel";
import { addTrack } from "../../redux/playerSlice";
import styles from "./index.module.scss";
import { fetchMyRecentlyPlayedTracks } from "../../redux/myRecentlyPlayedTracksSlice";
import { Loader } from "../../components/loader";
import useAuth from "../../hooks/useAuth";
import SpotifyWebApi from 'spotify-web-api-node';
import { useNavigate } from "react-router-dom";



interface props {
  code: string;
}

export const Main = ({code}: props) => {
  const navigate = useNavigate();
  const accessToken = useAuth(code);
  const dispatch = useAppDispatch();
  const releases = useSelector(getNewReleases);
  
  const myRecentlyPlayedTracks = useSelector(getMyRecentlyPlayedTracks);
  const isLoading = useSelector(getReleasesLoadingState);
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  });

  function clickHandler(url: string) {
    navigate(url);
  }
  const openTrack = (uri: string) => {
    dispatch(addTrack(uri));
  };

  useEffect(() => {

    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    dispatch(fetchNewReleases());
    dispatch(fetchMyRecentlyPlayedTracks());
  }, [accessToken]);

  return (
    <div className={styles.wrapper}>
      <h3>New Releases</h3>
      {releases && <Carousel albums={releases.albums.items} />}
      <h3>Recently Played Tracks</h3>
      <div className={styles.playedTracksContainer}>
        {myRecentlyPlayedTracks && myRecentlyPlayedTracks.items.map((el, index) =>(
          (index < 8) && 
          <div className={styles.playedTrack} key={el.track.id + Math.random() / index}>
            <img className={styles.playedTrackImg} src={el.track.album.images[1].url} alt="" />
            <p className={styles.playedTrackName} onClick={() => openTrack(el.track.uri)}>{el.track.name}</p>
            <p className={styles.playedTrackArtistName} onClick={() => clickHandler(`/artist/${el.track.artists[0].id}`)}>{el.track.artists[0].name}</p>
          </div>
        ))}
      </div>
      
      {isLoading && <Loader />}

       
    </div>
  );
};
