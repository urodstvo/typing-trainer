import styles from './footer.module.css';

export const Footer = () => {
    return (
        <footer>
            <a target="_blank" href="https://github.com/urodstvo/typing-trainer" className={styles.gh_link}>
                github
            </a>
        </footer>
    );
};
