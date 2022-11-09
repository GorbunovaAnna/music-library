import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getNewAlbums,
  getNewReleases,
  getReleasesLoadingState,
} from "../../redux/selectors";
import { fetchNewReleases } from "../../redux/releasesSlice";
import { useAppDispatch } from "../../store";
import { Releases } from "../../components/releases";

import styles from "./index.module.scss";
import { fetchNewAlbums } from "../../redux/albumsSlice";
import { Loader } from "../../components/loader";
import { Player } from "../../components/player";
import SpotifyPlayer from "react-spotify-web-playback";
import { getTokenFromCookie } from "../../spotify";

export const Main = () => {
  const dispatch = useAppDispatch();
  const releases = useSelector(getNewReleases);
  const albums = useSelector(getNewAlbums);
  const isLoading = useSelector(getReleasesLoadingState);

  useEffect(() => {
    dispatch(fetchNewReleases());
    dispatch(fetchNewAlbums());
  }, []);

  return (
    <div className={styles.wrapper}>
      {releases && <Releases albums={releases.albums.items} />}
      {isLoading && <Loader />}
      {/* <Player /> */}

      <SpotifyPlayer
        token={getTokenFromCookie()}
        uris={["spotify:album:6Fto97eXkutUmTGMM5wHfg"]}
      />
    </div>
  );
};
