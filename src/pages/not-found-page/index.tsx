import React from "react";
import styles from './index.module.scss';
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate("/");
    }

    return(
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Oops!</h1>
            <p className={styles.subtitle}>404 - page not found</p>
            <p className={styles.text}>Sorry, we can not find the page you are looking for</p>
            <button className={styles.btn} onClick={clickHandler}>go to homepage</button>
        </div>
    )
}