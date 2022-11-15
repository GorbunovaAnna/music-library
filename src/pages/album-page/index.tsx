import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../../cookie";
import axios from "axios";
import { spotifyURL } from "../../spotify";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiPlay, FiPlus } from "react-icons/fi";
import styles from "./index.module.scss";
import { ContextMenu } from "../../components/context-menu";

// https://api.spotify.com/v1/albums/{id}/tracks

// FiHeart
// FiPlus
// FiPlay

export const AlbumPage = () => {
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectSimplified[]>([]);
  const [album, setAlbum] = useState<SpotifyApi.SingleAlbumResponse>();
  const [isContextMenu, setIsContextMenu] = useState("");
  const [isActiveTrack, setIsActiveTrack] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  function clickHandler(url: string) {
    navigate(url);
  }
  function showContextMenu(id: string) {
    console.log("id", id);
    setIsContextMenu(id);
  }

  const closeContextMenu = () => {
    setIsContextMenu("");
  };

  const setActive = (id: string) => {
    setIsActiveTrack(id);
  };

  const openTrack = (id: string) => {
    console.log("open", id);
  };

  useEffect(() => {
    const access_token = getCookie("token");
    axios
      .get(`${spotifyURL}/albums/${id}/tracks`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setTracks(res.data.items);
        console.log("tracks", res.data.items);
      });
    axios
      .get(`${spotifyURL}/albums/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        console.log("album2222", res.data);
        setAlbum(res.data);
      });
  }, []);

  return (
    <div
      className={styles.wrapper}
      onClick={(e) => e.currentTarget === e.target && closeContextMenu()}
    >
      <div className={styles.header}>
        <img src={album?.images[1].url} alt="" />
        <div>
          <h1>{album?.name}</h1>
          <h2 onClick={() => clickHandler(`/artist/${album?.artists[0].id}`)}>
            {album?.artists[0].name}
          </h2>
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
              <div
                onClick={() => openTrack(el.id)}
                className={styles.trackNameWrapper}
              >
                {isActiveTrack  !== el.id && (
                  <p className={styles.trackNumber}>{el.track_number}</p>
                )}
                { isActiveTrack === el.id && <FiPlay className={styles.trackIconPlay} />}

                <p className={styles.trackName}>{el.name}</p>
              </div>
              <div className={styles.iconWrapper}>
                <FiHeart className={styles.like} />
                <div onClick={() => showContextMenu(el.id)}>
                  <FiPlus className={styles.add} />
                </div>
              </div>
              {isContextMenu === el.id && <ContextMenu id={el.id} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
