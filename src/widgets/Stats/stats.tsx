import { useLiveStore } from '@/shared/store/liveStore';
import { useMemo } from 'react';

import styles from './stats.module.css';

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
    // average length of words in english = 5
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
