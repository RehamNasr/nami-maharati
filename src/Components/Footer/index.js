import styles from './Footer.module.css'; 

export const FooterComponent = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.footerText}>
                &copy; {new Date().getFullYear()} نمي مهاراتي. جميع الحقوق محفوظة.
            </p>
            <p className={styles.footerText}>
                تم التصميم والتطوير بواسطة: <span className={styles.academyName}>Semicolon Academy</span>
            </p>
        </footer>
    );
};