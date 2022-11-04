import React from "react";
import styles from "./index.module.scss";
import { Audio } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const Loader = () => {
  return (
      <Audio
        height="100"
        width="100"
        color="rgb(248, 200, 35)"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="loader-class"
        visible={true}
      />
  );
};
