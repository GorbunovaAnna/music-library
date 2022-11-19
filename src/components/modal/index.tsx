
import React, {useState} from 'react';
import styles from "./index.module.scss";

export interface Props {
  closeModal: () => void;
  addPlaylist: (arg: string) => void;
}

export const Modal = ({ closeModal, addPlaylist }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const wrapperClick = (e: Event) => {
  };
 
  return (
    <div
      onClick={(e) => {
        e.currentTarget === e.target && closeModal();
      }}
      className={styles.backdrop}
    >
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Create playlist</h3>
        <input
          className={styles.input}
          onChange={(e)=> setInputValue(e.target.value)}
          value={inputValue}
          type="text"
          placeholder="Enter playlist name"
        />
        <button className={styles.btn} onClick={()=>addPlaylist(inputValue)}>
          Save
        </button>
      </div>
    </div>
  );
};
