import styles from "./index.module.scss";
import { FiPlus } from "react-icons/fi";

interface Props {
  playlists: SpotifyApi.PlaylistObjectSimplified[] | undefined;
  openModal: () => void;
  addTrackToPlaylist: (id: string, uri: string) => void;
  trackUri: string;
}

export const ContextMenu = ({
  playlists,
  openModal,
  addTrackToPlaylist,
  trackUri,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.createPlaylistBtn} onClick={openModal}>
        Create playlist
      </button>
      <div className={styles.playlistContainer}>
        {playlists?.length &&
          playlists.map((el) => {
            return (
              <p
                key={el.id}
                onClick={() => addTrackToPlaylist(el.id, trackUri)}
              >
                {el.name} <FiPlus className={styles.icon} />
              </p>
            );
          })}
      </div>
    </div>
  );
};
