import React from 'react';
import styles from './index.module.scss';

interface props {
    title: string,
    image: string,
    tracks: string,
}

export const MyPlaylist = ({title, image, tracks}:props) => {
    return(
        <div className={styles.wrapper}>
            <img className={styles.img} src={image} alt="" />
            <h3 className={styles.title}>{title}</h3>

        </div>
    )
}