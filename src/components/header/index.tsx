import React, { useEffect} from "react";
import styles from "./index.module.scss";
import { Search } from "../search";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../redux/selectors";
import { useAppDispatch } from "../../store";
import { fetchUserInfo } from "../../redux/userSlice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useSelector(getUserInfo);
  console.log("999999", userInfo);
 

  useEffect(() => {
     dispatch(fetchUserInfo());
  }, []);

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.logo}
        src="/images/logo.png"
        alt="logo"
        onClick={() => navigate("/")}
      />
      <Search />
      <nav>
        <ul>
          <Link to="/playlists">My playlists</Link>
        </ul>
      </nav>

      <div className={styles.userInfo}>
        {userInfo && <div className={styles.userAvatar}>
          <img  src="" alt="" />
        </div>}
        <p className={styles.userName}>{userInfo?.display_name}</p>
        <button className={styles.btn}>Log out</button>
      </div>
    </div>
  );
};
