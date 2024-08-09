import styles from './stats.module.css';

export const Stats = () => {
    return (
        <div className={styles.statsContainer}>
            <article className={styles.statsCard}>
                <h3 className={styles.heading}>
                    Errors <sup>AVG</sup>
                </h3>
                <span className={styles.statsRecord}>14</span>
            </article>
            <article className={styles.statsCard}>
                <h3 className={styles.heading}>
                    WPM <sup>AVG</sup>
                </h3>
                <span className={styles.statsRecord}>16</span>
            </article>
            <article className={styles.statsCard}>
                <h3 className={styles.heading}>
                    Accuracy <sup>AVG</sup>
                </h3>
                <span className={styles.statsRecord}>94%</span>
            </article>
        </div>
    );
};
