import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import styles from "./index.module.scss";
import { getTrack } from "../../redux/selectors";

interface props {
    code: string;
  }

export const Footer = ({code}: props) => {
    const accessToken = useAuth(code);
    const track = useSelector(getTrack);

  return (
    <div className={styles.wrapper}>
      {accessToken && (
        <SpotifyPlayer
          token={accessToken}
          uris={track}
        />
      )}
    </div>
  );
};
