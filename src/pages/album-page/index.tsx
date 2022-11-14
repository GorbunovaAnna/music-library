import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../../cookie";
import axios from "axios";
import { spotifyURL } from "../../spotify";

import styles from "./index.module.scss";

// https://api.spotify.com/v1/albums/{id}/tracks

export const AlbumPage = () => {
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectSimplified[]>([]);
  const [album, setAlbum] = useState<SpotifyApi.SingleAlbumResponse>();
  const { id } = useParams();

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
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src={album?.images[1].url} alt="" />
        <div>
          <h1>{album?.name}</h1>
          <h2>{album?.artists[0].name}</h2>
        </div>
      </div>
      <div className={styles.list}>
        {tracks.map((el) => (
          <div className={styles.item} key={el.id}>
            <p>
              <span className={styles.trackNumber}>{el.track_number}</span>
              <span className={styles.trackName}>{el.name}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
