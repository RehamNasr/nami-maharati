import React from "react";
import styles from './Header.module.css'; 

export const HeaderComponent = ({appname, setappname }) => {
    const onclickOption = (screenName, event) => {
        event.preventDefault(); 
        setappname(screenName);
    };

    return (
        <header className={styles.header}>
            <h2 className={styles.appTitle}>نمي مهاراتي (for Kids) By Eman Eid</h2>
            <nav className={styles.navbarNav}>
               <a
                    href="#"
                    className={`${styles.navLink} ${appname === "HomeScreen" ? styles.activeNavLink : ''}`}
                    onClick={(e) => onclickOption("HomeScreen", e)}
                >
                    الرئيسية
                </a>
                <a
                    href="#"
                    className={`${styles.navLink} ${appname === "PlayersScreen" ? styles.activeNavLink : ''}`}
                    onClick={(e) => onclickOption("PlayersScreen", e)}
                >
                    الألعاب
                </a>
                <a
                    href="#"
                    className={`${styles.navLink} ${appname === "AboutScreen" ? styles.activeNavLink : ''}`}
                    onClick={(e) => onclickOption("AboutScreen", e)}
                >
                    معلومات عنا
                </a>
            </nav>
        </header>
    );
};