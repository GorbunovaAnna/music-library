import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { getCookie } from '../../cookie';

export const Player = (props: any) => {
  const [player, setPlayer] = useState(undefined);
  const access_token = getCookie('token');

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb: any) => {
          console.log(111, access_token)
          cb(access_token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }: any) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }: any) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();
    };
  }, []);

  return (
    <>
      <div className="container222">
        <div className="main-wrapper"></div>
      </div>
    </>
  );
};
