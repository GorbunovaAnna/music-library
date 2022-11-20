import React, { useEffect } from "react";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import {
  getUserInfo,
  getMyPlaylists,
  getReleasesLoadingState,
} from "../../redux/selectors";
import { fetchMyPlaylists } from "../../redux/myPlaylistsSlice";
import { MyPlaylist } from "../../components/my-playlist";
import { Loader } from "../../components/loader";
import styles from "./index.module.scss";

export const MyPlaylistsPage = () => {
  const dispatch = useAppDispatch();
  const userInfo = useSelector(getUserInfo);
  const myPlaylists = useSelector(getMyPlaylists);
  const isLoading = useSelector(getReleasesLoadingState);

  useEffect(() => {
    if (userInfo?.id) {
      dispatch(fetchMyPlaylists(userInfo.id));
    }
  }, [userInfo]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>My playlists</h1>
      {isLoading && <Loader />}
      <div className={styles.playlistContainer}>
        {myPlaylists?.items.map((el) => {
          return <MyPlaylist key={el.id} playlist={el} />;
        })}
      </div>
    </div>
  );
};
