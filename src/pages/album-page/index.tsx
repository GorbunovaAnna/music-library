import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../../cookie";
import axios from "axios";
import { spotifyURL } from "../../spotify";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiPlay, FiPlus } from "react-icons/fi";
import styles from "./index.module.scss";
import { ContextMenu } from "../../components/context-menu";
import { useAppDispatch } from "../../store";
import { addTrack } from "../../redux/playerSlice";
import { title } from "process";
import { useSelector } from "react-redux";
import { getMyPlaylists } from "../../redux/selectors";
import { addPlaylistToSpotify, fetchMyPlaylists } from "../../redux/myPlaylistsSlice";
import { Modal } from "../../components/modal";

export const AlbumPage = () => {
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectSimplified[]>([]);
  const [album, setAlbum] = useState<SpotifyApi.SingleAlbumResponse>();
  const [isContextMenu, setIsContextMenu] = useState("");
  const [isActiveTrack, setIsActiveTrack] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const playlists = useSelector(getMyPlaylists);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const clickHandler = (url: string) => {
    navigate(url);
  };
  const showContextMenu = (id: string) => {
    setIsContextMenu(id);
  };

  const closeContextMenu = () => {
    setIsContextMenu("");
  };

  const setActive = (id: string) => {
    setIsActiveTrack(id);
  };

  const openTrack = (uri: string | undefined) => {
    if (uri) {
      dispatch(addTrack(uri));
    }
  };

  const openModal = () => {
    closeContextMenu();
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const addPlaylist = (inputValue :string) => {
    dispatch(addPlaylistToSpotify(inputValue));

  };

  useEffect(() => {
    const access_token = getCookie("token");
    axios
      .get(`${spotifyURL}/albums/${id}/tracks`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setTracks(res.data.items);
      });
    axios
      .get(`${spotifyURL}/albums/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setAlbum(res.data);
      });
    dispatch(fetchMyPlaylists(""));
  }, []);

  return (
    <div
      className={styles.wrapper}
      onClick={(e) => e.currentTarget === e.target && closeContextMenu()}
    >
      <div className={styles.header}>
        <img src={album?.images[1].url} alt="" />
        <div className={styles.titleContainer}>
          <div>
            <h1>{album?.name}</h1>
            <h2 onClick={() => clickHandler(`/artist/${album?.artists[0].id}`)}>
              {album?.artists[0].name}
            </h2>
          </div>
          <div
            className={styles.playContainer}
            onClick={() => openTrack(album?.uri)}
          >
            <FiPlay className={styles.trackIconPlay} />
          </div>
        </div>
      </div>
      {tracks && (
        <div className={styles.list}>
          {tracks.map((el) => (
            <div
              onMouseEnter={() => setActive(el.id)}
              onMouseLeave={() => setActive("")}
              className={styles.item}
              key={el.id}
            >
              <div className={styles.trackNameWrapper}>
                {isActiveTrack !== el.id && (
                  <p className={styles.trackNumber}>{el.track_number}</p>
                )}
                {isActiveTrack === el.id && (
                  <FiPlay
                    className={styles.trackIconPlay}
                    onClick={() => openTrack(el.uri)}
                  />
                )}

                <p className={styles.trackName}>{el.name}</p>
              </div>
              <div className={styles.iconWrapper}>
                <FiHeart className={styles.like} />
                <div onClick={() => showContextMenu(el.id)}>
                  <FiPlus className={styles.add} />
                </div>
              </div>
              {isContextMenu === el.id && (
                <ContextMenu
                  playlists={playlists?.items}
                  openModal={openModal}
                />
              )}
            </div>
          ))}
        </div>
      )}
      {isOpenModal && <Modal closeModal={closeModal} addPlaylist={addPlaylist}/>}
    </div>
  );
};
