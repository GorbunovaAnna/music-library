import styles from "./index.module.scss";
import { ImMusic } from "react-icons/im";
import { FiXSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface PropsSearch {
  data: SpotifyApi.SearchResponse | null;
  closeModal: () => void;
  inputValue: string;
}

export const SearchResultPopUp = (props: PropsSearch) => {
  console.log(props);
  const navigate = useNavigate();

  const getAllArtists = (arr: any) => {
    const res = arr.reduce((acc: string, el: { name: string }) => {
      acc += el.name + " ";
      return acc;
    }, "");
    return res;
  };

  const handleNavigate = (url: string) => {
    props.closeModal();
    navigate(url);
    props.inputValue = "";
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
                <ImMusic />
              </div>
              <p>{item.name}&nbsp;</p>
              <p>{getAllArtists(item.artists)}</p>
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
              <img src={el.images[2].url} />
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
