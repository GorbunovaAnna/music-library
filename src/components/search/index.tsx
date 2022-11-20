import React, { useState, useCallback, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import { ImSearch } from "react-icons/im";
import { SearchResultPopUp } from "../search-result-pop-up";
import { useSpotifyApi } from "../../hooks/useSpotifyApi";
import useDebounce from "../../hooks/useDebounce";

export const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const spotifyApi = useSpotifyApi();
  const [data, setData] = useState<SpotifyApi.SearchResponse | null>(null);
  const inputRef = useRef(null);

  const debouncedInputValue = useDebounce(inputValue, 700);

  useEffect(() => {
    if (debouncedInputValue) {
      sendRequest(debouncedInputValue);
    } else {
      setIsShowModal(false);
    }
  }, [debouncedInputValue]);

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
  }

  function closeModal() {
    setIsShowModal(false);
    //@ts-ignore
    inputRef.current.value = ''; 
    
  }

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        name=""
        id=""
        placeholder="search..."
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
