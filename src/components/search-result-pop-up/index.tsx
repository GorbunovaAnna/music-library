import styles from "./index.module.scss";
import { FiPlay } from "react-icons/fi";
import { FiXSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { addTrack } from "../../redux/playerSlice";

interface PropsSearch {
  data: SpotifyApi.SearchResponse | null;
  closeModal: () => void;
  inputValue: string;
}

export const SearchResultPopUp = (props: PropsSearch) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleNavigate = (url: string) => {
    props.closeModal();
    navigate(url);

  };

  const openTrack = (uri: string | undefined) => {
    if (uri) {
      dispatch(addTrack(uri));
    }
  };


  return (
    <div
      className={styles.backdrop}
      onClick={(e) => e.currentTarget === e.target && props.closeModal()}
    >
      <div className={styles.wrapper}>
        <h1>Searching results:</h1>
        <h2>Tracks</h2>
        {props.data?.tracks?.items.map((item, index) => {
          return (
            <div  key={item.id} className={styles.resultElement}>
              <div className={styles.icon}>
              <FiPlay
                    className={styles.trackIconPlay}
                    onClick={() => openTrack(item.uri)}
                  />
              </div>
              <p>{item.name}&nbsp;&ndash;&nbsp;</p>
              <p className={styles.artistName} >
                {item.artists.map((el) =>(
                  <span key={el.id} onClick={() => {
                    handleNavigate(`/artist/${el.id}`);
                  }}>{el.name} &nbsp;</span>
                ))}
              </p>
            </div>
          );
        })}
        <h2>Artists</h2>
        {props.data?.artists?.items.map((el) => {
          return (
            <div
              key={el.id}
              onClick={() => {
                handleNavigate(`/artist/${el.id}`);
              }}
              className={styles.resultElement}
            >
              {el.images.length && <img src={el.images[2].url} />}
              <p>{el.name}</p>
            </div>
          );
        })}
        <div className={styles.closeBtn} onClick={props.closeModal}>
          <FiXSquare />
        </div>
      </div>
    </div>
  );
};
