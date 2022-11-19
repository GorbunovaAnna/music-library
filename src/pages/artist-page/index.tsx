import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../../cookie";
import axios from "axios";
import { spotifyURL } from "../../spotify";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { useSpotifyApi } from "../../hooks/useSpotifyApi";
import { FiPlay } from "react-icons/fi";
import { addTrack } from "../../redux/playerSlice";
import { useAppDispatch } from "../../store";

export const ArtistPage = () => {
  const [albums, setAlbums] = useState<SpotifyApi.AlbumObjectSimplified[]>([]);
  const [artist, setArtist] = useState<SpotifyApi.SingleArtistResponse>();
  const [isActiveTracks, setIsActiveTracks] = useState("");
  const { id } = useParams();
  const spotifyApi = useSpotifyApi();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const setActive = (id: string) => {
    setIsActiveTracks(id);
  };
  const openTrack = (uri: string) => {
    dispatch(addTrack(uri));
  };

  useEffect(() => {
    // const access_token = getCookie("token");
    if (id) {
      spotifyApi.getArtistAlbums(id).then((res) => {
        setAlbums(res.body.items);
       
      });
      spotifyApi.getArtist(id).then((res) => {
        setArtist(res.body);
      });
    }
    // axios
    //   .get(`${spotifyURL}/artists/${id}/albums`, {
    //     headers: { Authorization: `Bearer ${access_token}` },
    //   })
    //   .then((res) => {
    //     setAlbums(res.data.items);
    //     console.log("albums", res.data.items);
    //   });
    // axios
    //   .get(`${spotifyURL}/artists/${id}`, {
    //     headers: { Authorization: `Bearer ${access_token}` },
    //   })
    //   .then((res) => {
    //     setArtist(res.data);
    //     console.log("artist", res.data);
    //   })
    //   .catch((e) => {
    //     console.log("is er", e);
    //   });
  }, [id]);

  return (
    <div className={styles.wrapper}>
      {artist && (
        <div className={styles.header}>
          <img src={artist.images[1].url} alt="" />
          <h1 className={styles.title}>{artist.name}</h1>
        </div>
      )}
      {albums &&
        albums.map((el) => (
          <div
            className={styles.list}
            onMouseEnter={() => setActive(el.id)}
            onMouseLeave={() => setActive("")}
            key={el.id}
          >
            <div className={styles.imageContainer}>
              {isActiveTracks === el.id ? (
                <div className={styles.playContainer}>
                  <FiPlay
                    className={styles.trackIconPlay}
                    onClick={() => openTrack(el.uri)}
                  />
                </div>
              ) : (
                <img src={el.images[2].url} alt="" />
              )}
            </div>

            <p
              onClick={() => {
                handleNavigate(`/album/${el.id}`);
              }}
            >
              {el.name}
            </p>
            <p onClick={() => {
                handleNavigate(`/album/${el.id}`);
              }}>
              ( {el.total_tracks} {el.total_tracks === 1 ? "track" : "tracks"} )
            </p>
          </div>
        ))}
    </div>
  );
};
