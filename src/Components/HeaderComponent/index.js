import React from "react";
import styles from './Header.module.css';

export const HeaderComponent = ({ appname, setappname, cartItemCount }) => { // Add cartItemCount prop
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
                {/* New Cart Link */}
                <a
                    href="#"
                    className={`${styles.navLink} ${appname === "CartScreen" ? styles.activeNavLink : ''} ${styles.cartLink}`}
                    onClick={(e) => onclickOption("CartScreen", e)}
                >
                    <svg className={styles.cartIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7c-26.3 0-45.5-25-38.6-50.4L138.6 320H500.5c18.6 0 34.6 14.4 35.5 33.1l18.7 37.4c.9 1.8 1.4 3.7 1.8 5.7c.6 3 1 6 1.4 9.1c.5 3.3 .7 6.6 .7 10.1c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-5.5 .6-10.8 1.4-16.2H320c1.4 5.4 2.2 10.8 2.2 16.2c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-5.5 .6-10.8 1.4-16.2H80c-44.2 0-80-35.8-80-80c0-4.1 .3-8.1 .9-12L12.4 108.4c-9.1-34 16.3-67.4 50.6-67.4H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H120.6L102.3 224H452c13.3 0 24 10.7 24 24s-10.7 24-24 24H102.3zM160 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm320 0a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"/></svg>
                    {cartItemCount > 0 && <span className={styles.cartBadge}>{cartItemCount}</span>}
                </a>
            </nav>
        </header>
    );
};