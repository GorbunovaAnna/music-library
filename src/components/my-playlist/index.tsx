import React, { useState } from "react";
import styles from "./index.module.scss";
import { FiMusic, FiPlay, FiTrash2 } from "react-icons/fi";
import { useAppDispatch } from "../../store";
import { addTrack } from "../../redux/playerSlice";
import { deletePlaylistToSpotify } from '../../redux/myPlaylistsSlice'
import { useNavigate } from "react-router-dom";


interface Props {
  playlist: SpotifyApi.PlaylistObjectSimplified;
}

export const MyPlaylist = ({ playlist }: Props) => {
  const [isActivePlay, setIsActivePlay] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const openTrack = (uri: string) => {
    dispatch(addTrack(uri));
  };

  const deletePlaylist = () => {
    dispatch(deletePlaylistToSpotify(playlist.id));
  }

  const openDetailsPage = ()=>{
    navigate(`/playlist/${playlist.id}`);
  }

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setIsActivePlay(true)}
      onMouseLeave={() => setIsActivePlay(false)}
    >
      <div className={styles.imgContainer}>
        {isActivePlay && (
          <div
            className={styles.iconPlayContainer}
            onClick={() => openTrack(playlist.uri)}
          >
            <FiPlay className={styles.iconPlay} />
          </div>
        )}
        {playlist.images[0]?.url ? (
          <img className={styles.img} src={playlist.images[0]?.url} alt="" />
        ) : (
          <FiMusic className={styles.iconMusic} />
        )}
      </div>
      <div className={styles.titleContainer}>
        <h3 onClick={openDetailsPage} className={styles.title}>{playlist.name}</h3>
        { isActivePlay && <FiTrash2  className={styles.iconTrash} onClick={() => deletePlaylist()} />}
      </div>
    </div>
  );
};
