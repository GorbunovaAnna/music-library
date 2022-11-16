import React from 'react';
import { useSelector } from 'react-redux';
import { getMyPlaylists } from '../../redux/selectors';
import styles from './index.module.scss';

interface Props {
    id: string;
}

export const ContextMenu = ({id}: Props) => {
    return(
        <div className={styles.wrapper}>
            <button className={styles.createPlaylistBtn}>Create playlist</button>
        </div>
    )
}