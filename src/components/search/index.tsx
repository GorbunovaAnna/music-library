import React, { useState, useCallback, useEffect } from "react";
import styles from "./index.module.scss";
import { ImSearch } from "react-icons/im";
import { SearchResultPopUp } from "../search-result-pop-up";
import { getCookie } from "../../cookie";
import SpotifyWebApi from "spotify-web-api-node";
import { useSpotifyApi } from "../../hooks/useSpotifyApi";
import { debounce } from "lodash";
import useDebounce from "../../hooks/useDebounce";
// import debounce from "lodash/debounce";

export const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const spotifyApi = useSpotifyApi();
  const [data, setData] = useState<SpotifyApi.SearchResponse | null>(null);

  const debouncedInputValue = useDebounce(inputValue, 700);

 
  useEffect(
    () => {
      if (debouncedInputValue) {
        sendRequest(debouncedInputValue);
      } else {
        setIsShowModal(false);
      }
    },
    [debouncedInputValue]
  );

  async function sendRequest(value: string) {
    try {
      const res = await spotifyApi.search(value, ["track", "artist"], {
        limit: 3,
      });
      setData(res.body);
      setIsShowModal(true);
    } catch (e) {
      console.log(e);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
    // debounceFn();
  }

  function closeModal() {
    setIsShowModal(false);
    setInputValue("");
  }

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        name=""
        id=""
        placeholder="search..."
        // value={inputValue}
        onChange={handleChange}
      />
      <button className={styles.button}>
        <ImSearch />
      </button>
      {isShowModal && (
        <SearchResultPopUp
          data={data}
          closeModal={closeModal}
          inputValue={inputValue}
        />
      )}
    </div>
  );
};
