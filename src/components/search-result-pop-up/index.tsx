import React, { useState } from "react";
import styles from "./index.module.scss";
import { ImMusic } from "react-icons/im";
import { FiXSquare } from "react-icons/fi";

interface PropsSearch {
  data: SpotifyApi.SearchResponse | null;
  closeModal: () => void;
}

export const SearchResultPopUp = (props: PropsSearch) => {
  console.log(props);

  const getAllArtists = (arr: any) => {
    const res = arr.reduce((acc: string, el: { name: string }) => {
      acc += el.name + " ";
      return acc;
    }, "");
    return res;
  };

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => e.currentTarget === e.target && props.closeModal()}
    >
      <div className={styles.wrapper}>
        <h1>Searching results:</h1>
        <h2>tracks</h2>
        {props.data?.tracks?.items.map((item, index) => {
          return (
            <div className={styles.resultElement}>
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
            <div onClick={()=>{console.log(el.id)}} className={styles.resultElement}>
              <img src={el.images[2].url} />
              <p>{el.name}</p>
            </div>
          );
        })}
        {/* <img src={props.data?.artists?.items[0].images[2]} alt="" />
        <p>{props.data?.artists?.items[0].name}</p> */}
        <div className={styles.closeBtn} onClick={props.closeModal}>
          <FiXSquare />
        </div>
      </div>
    </div>
  );
};
