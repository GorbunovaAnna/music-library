import React from "react";
import styles from './index.module.scss';
import { Search } from "../search";



export const Header = () => {
    return (
        <div className={styles.wrapper}>
            <img className={styles.logo} src="/images/logo.png" alt="logo" />
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