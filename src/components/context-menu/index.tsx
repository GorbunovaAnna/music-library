import styles from "./index.module.scss";
import { FiPlus } from "react-icons/fi";

interface Props {
  id: string;
  playlists: SpotifyApi.PlaylistObjectSimplified[] | undefined;
  openModal: () => void;
}

export const ContextMenu = ({ id, playlists, openModal }: Props) => {
  console.log("wwwwwww", playlists);

  return (
    <div className={styles.wrapper}>
      <button className={styles.createPlaylistBtn} onClick={openModal}>Create playlist</button>
      <div className={styles.playlistContainer}>
        {playlists?.length &&
          playlists.map((el) => {
            return <p key={el.id}>  {el.name } <FiPlus  className={styles.icon}/></p>;
          })}
      </div>
    </div>
  );
};
