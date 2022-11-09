import React from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../../cookie";
import axios from "axios";
import { spotifyURL } from "../../spotify";
import styles from "./index.module.scss";

export const ArtistPage = () => {
  const { id } = useParams();
  console.log(id);

  async function sendRequest() {
    const access_token = getCookie("token");
    const res = await axios.get(`${spotifyURL}/artists/{id}/albums`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    console.log('333', res);
  }
  sendRequest();

  return <div></div>;
};
