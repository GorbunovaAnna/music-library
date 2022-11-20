import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMyPlaylistById, fetchDeleteTrackFromPlaylist} from "../../redux/myPlaylistsSlice";
import { getPlaylist } from "../../redux/selectors";
import { useAppDispatch } from "../../store";
import { FiHeart, FiPlay, FiMusic, FiTrash, FiTrash2 } from "react-icons/fi";
import { addTrack } from "../../redux/playerSlice";
import styles from "./index.module.scss";

export const PlaylistPage = () => {
  const [isActiveTrack, setIsActiveTrack] = useState("");
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const playlist = useSelector(getPlaylist);

  useEffect(() => {
    if (id) {
      dispatch(fetchMyPlaylistById(id));
    }
  }, []);

  const openTrack = (uri: string | undefined) => {
    if (uri) {
      dispatch(addTrack(uri));
    }
  };
  const setActive = (id: string) => {
    setIsActiveTrack(id);
  };

  const deleteTrackFromPlaylist = (id: string, uri: string) => {
    dispatch(fetchDeleteTrackFromPlaylist({id, uri}));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {playlist?.images[0] ? (
          <img src={playlist?.images[0].url} alt="" />
        ) : (
          <div className={styles.noPicture}>
            {" "}
            <p>no picture</p>
          </div>
        )}
        <div className={styles.titleContainer}>
          <div>
            <h1>{playlist?.name}</h1>
            <p>playlist</p>
          </div>
          <div
            className={styles.playContainer}
            onClick={() => openTrack(playlist?.uri)}
          >
            <FiPlay className={styles.trackIconPlay} />
          </div>
        </div>
      </div>
      {playlist?.tracks && (
        <div className={styles.list}>
          {playlist.tracks.items.map((el, index) => (
            <div
              onMouseEnter={() => setActive(el.track?.id || "")}
              onMouseLeave={() => setActive("")}
              className={styles.item}
              key={el.track?.id}
            >
              <div className={styles.trackNameWrapper}>
                {isActiveTrack !== el.track?.id && (
                  <p className={styles.trackNumber}>{index + 1}</p>
                )}
                {isActiveTrack === el.track?.id && (
                  <FiPlay
                    className={styles.trackIconPlay}
                    onClick={() => openTrack(el.track?.uri)}
                  />
                )}

                <p className={styles.trackName}>{el.track?.name}&nbsp;</p>
                <p
                  className={styles.trackArtistName}
                >{`(${el.track?.artists[0].name})`}</p>
              </div>
              <div className={styles.iconWrapper}>
                <FiHeart className={styles.like} />
                <FiTrash2 className={styles.trash} onClick={() => deleteTrackFromPlaylist(id || "", el.track?.uri || "")} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
