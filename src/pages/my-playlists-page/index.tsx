import React, { useEffect} from "react";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../redux/selectors";
import { fetchMyPlaylists } from "../../redux/myPlaylistsSlice";
import styles from './index.module.scss';

export const MyPlaylistsPage = () => {
    const dispatch = useAppDispatch();
    const userInfo = useSelector(getUserInfo);
    

    useEffect(() => {
        console.log('ewqeqws')
        if(userInfo?.id){
            dispatch(fetchMyPlaylists(userInfo.id));
        }
    }, [userInfo]);

    return(
        <div className={styles.wrapper}>
            <h1>My playlists</h1>

        </div>
    )
}