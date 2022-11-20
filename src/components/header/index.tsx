import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { Search } from "../search";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../redux/selectors";
import { useAppDispatch } from "../../store";
import { fetchUserInfo } from "../../redux/userSlice";
import { deleteCookie, getCookie } from '../../cookie';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useSelector(getUserInfo);
  const token = getCookie('token')

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  const logOut = () => {
   deleteCookie('token');
   deleteCookie('refresh_token');
    window.location.reload();
  }

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.logo}
        src="/images/logo.png"
        alt="logo"
        onClick={() => navigate("/")}
      />
      <div className={styles.searchContainer}>
        <Search />
      </div>
      <nav>
        <ul>
          <Link to="/playlists">My playlists</Link>
        </ul>
      </nav>

      <div className={styles.userInfo}>
        {userInfo && (
          <div className={styles.userAvatar}>
            {userInfo.images?.length && (
              <img src={userInfo.images[0].url} alt="" />
            )}
          </div>
        )}
        <p className={styles.userName}>{userInfo?.display_name}</p>
        { userInfo && <button className={styles.btn} onClick={logOut}>Log out</button>}
      </div>
    </div>
  );
};
