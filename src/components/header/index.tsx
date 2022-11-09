import React from "react";
import styles from './index.module.scss';
import { Search } from "../search";
import { useNavigate } from "react-router-dom";



export const Header = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            <img className={styles.logo} src="/images/logo.png" alt="logo" onClick={() => navigate('/')} />
            <Search />
            <nav>
                <ul>
                    <li><a>lorem</a></li>
                    <li><a>lorem</a></li>
                    <li><a>lorem</a></li>
                    <li><a>lorem</a></li>
                </ul>
            </nav>
        </div>
    )
}