

import React, { useEffect } from "react";
import styles from './login-page.module.scss'
import { getTokenFromUrl, loginUrl } from "../../spotify";
import { getCookie, setCookie } from "../../cookie";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { fetchUserInfo } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../redux/selectors";

export const LoginPage = () => {
  
const navigate = useNavigate();
const dispatch = useAppDispatch();
const userInfo = useSelector(getUserInfo);

  useEffect(() => {
    const res = getTokenFromUrl();
  }, []);

  return (
    <div className={styles.wrapper}>
      <p>Welcome to the music library</p>
      <p>Here you can listen to your favorite music and create unique playlists</p>
      <p>Follow the link and register</p>
      <a href={loginUrl} className={styles.link}>Sign in with spotify</a>
    </div>
  )
}
