import React, { useState } from "react";
import styles from "./index.module.scss";

interface PropsSearch {
    data: SpotifyApi.SearchResponse | null;
}

export const SearchResultPopUp = (props: PropsSearch) => {
    console.log(props);

  return (
    <div className={styles.wrapper}>
      <h1>Searching results:</h1>
      <h2>tracks</h2>
      
      <h2>musicians</h2>
      {/* <img src={props.data?.artists?.items[0].images[2]} alt="" /> */}
      <p>{props.data?.artists?.items[0].name}</p>
    </div>
  );
};
