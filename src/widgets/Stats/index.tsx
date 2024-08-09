import { useHistoryStore } from '@/shared/store/historyStore';
import { useLiveStore } from '@/shared/store/liveStore';
import { useMemo } from 'react';

import styles from './stats.module.css';

const AVGErrorsCard = () => {
    const errors = useHistoryStore((state) => state.errors);
    const avg_errors = useMemo(
        () => (errors.length ? Math.round(errors.reduce((a, b) => a + b, 0) / errors.length) : 0),
        [errors],
    );
    return (
        <article className={styles.statsCard}>
            <h3 className={styles.heading}>
                Errors <sup>AVG</sup>
            </h3>
            <span className={styles.statsRecord}>{avg_errors}</span>
        </article>
    );
};

const AVGWpmCard = () => {
    const wpm = useHistoryStore((state) => state.wpm);
    const avg_wpm = useMemo(() => (wpm.length ? Math.round(wpm.reduce((a, b) => a + b, 0) / wpm.length) : 0), [wpm]);

    return (
        <article className={styles.statsCard}>
            <h3 className={styles.heading}>
                WPM <sup>AVG</sup>
            </h3>
            <span className={styles.statsRecord}>{avg_wpm}</span>
        </article>
    );
};

const AVGAccuracyCard = () => {
    const accuracy = useHistoryStore((state) => state.accuracy);
    const avg_accuracy = useMemo(
        () => (accuracy.length ? Math.round(accuracy.reduce((a, b) => a + b, 0) / accuracy.length) : 0),
        [accuracy],
    );

    return (
        <article className={styles.statsCard}>
            <h3 className={styles.heading}>
                Accuracy <sup>AVG</sup>
            </h3>
            <span className={styles.statsRecord}>{avg_accuracy}%</span>
        </article>
    );
};

export const AvgStats = () => {
    return (
        <div className={styles.statsContainer}>
            <AVGErrorsCard />
            <AVGWpmCard />
            <AVGAccuracyCard />
        </div>
    );
};

const ErrorsCard = () => {
    const errors = useLiveStore((state) => state.errorsCount);
    return (
        <article className={styles.statsCard}>
            <h3 className={styles.heading}>Errors</h3>
            <span className={styles.statsRecord}>{errors}</span>
        </article>
    );
};

const WpmCard = () => {
    const chars = useLiveStore((state) => state.charTyped);
    const time = useLiveStore((state) => state.timeElapsed);
    const wpm = useMemo(() => Math.round((chars / 5 / time) * 60), [chars, time]);

    return (
        <article className={styles.statsCard}>
            <h3 className={styles.heading}>WPM</h3>
            <span className={styles.statsRecord}>{wpm}</span>
        </article>
    );
};

const AccuracyCard = () => {
    const chars = useLiveStore((state) => state.charTyped);
    const errors = useLiveStore((state) => state.errorsCount);
    const accuracy = useMemo(() => {
        const correctCharacters = chars - errors;
        const accuracyVal = Math.round((correctCharacters / chars) * 100);
        return accuracyVal;
    }, [chars, errors]);

    return (
        <article className={styles.statsCard}>
            <h3 className={styles.heading}>Accuracy</h3>
            <span className={styles.statsRecord}>{accuracy}%</span>
        </article>
    );
};

export const Stats = () => {
    return (
        <div className={styles.statsContainer}>
            <ErrorsCard />
            <WpmCard />
            <AccuracyCard />
        </div>
    );
};
