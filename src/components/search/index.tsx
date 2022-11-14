import React, { useState } from "react";
import styles from "./index.module.scss";
import { ImSearch } from "react-icons/im";
import { SearchResultPopUp } from "../search-result-pop-up";
import { spotifyURL } from "../../spotify";
import { getCookie } from "../../cookie";
import axios from "axios";
// import debounce from "lodash/debounce";

export const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [data, setData] = useState<SpotifyApi.SearchResponse | null>(null);
  //  const debounceFn = useCallback(debounce(sendRequest, 500), []);

  async function sendRequest() {
    const access_token = getCookie('token');
    const res = await axios.get(`${spotifyURL}/search?type=track,artist&q=${inputValue}&limit=3`, { headers: { 'Authorization': `Bearer ${access_token}` } });
    console.log ('search', res);
    setData(res.data);
    setIsShowModal(true);
    
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
    // debounceFn();
  }

  function closeModal() {
    setIsShowModal(false);
  }

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        name=""
        id=""
        placeholder="search..."
        value={inputValue}
        onChange={handleChange}
      />
      <button className={styles.button} onClick={sendRequest}>
        <ImSearch />
      </button>
      {isShowModal && <SearchResultPopUp data={data} closeModal={closeModal} inputValue={inputValue}/>}
    </div>
  );
};
