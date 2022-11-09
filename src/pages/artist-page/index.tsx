import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../../cookie";
import axios from "axios";
import { spotifyURL } from "../../spotify";
import styles from "./index.module.scss";

export const ArtistPage = () => {
  const [albums, setAlbums] = useState<SpotifyApi.AlbumObjectSimplified[]>([]);
  const [artist, setArtist] = useState<SpotifyApi.SingleArtistResponse>();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const access_token = getCookie("token");
    axios
      .get(`${spotifyURL}/artists/${id}/albums`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setAlbums(res.data.items);
        console.log('albums', res.data.items)
      });
    axios
      .get(`${spotifyURL}/artists/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setArtist(res.data);
        console.log('artist', res.data)
      });
  }, [id]);


  return (
    <div className={styles.wrapper}>
      {artist && 
      <div className={styles.header}>
        <img src={artist.images[1].url} alt="" />
        <h1 className={styles.title}>{artist.name}</h1>
      </div>
      }
      {albums &&
        albums.map((el) => (
          <div className={styles.list}>
            <img src={el.images[2].url} alt="" />
            <p>{el.name}</p>
            <p>( {el.total_tracks} {el.total_tracks === 1 ? 'track' : 'tracks'} )</p>
          </div>
        ))}
    </div>
  );
};
