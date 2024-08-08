import { useEffect, useState } from 'react';

import styles from './timer.module.css';

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const Timer = ({ seconds, isStarted, onEnd }: { seconds: number; isStarted: boolean; onEnd?: () => void }) => {
    const [secondsLeft, setSecondsLeft] = useState<number>(seconds);

    useEffect(() => {
        const timer = setInterval(() => {
            if (isStarted)
                setSecondsLeft((prev) => {
                    if (prev - 1 === 0) clearInterval(timer);
                    return prev - 1;
                });
        }, 1000);

        return () => clearInterval(timer);
    }, [isStarted]);

    useEffect(() => {
        if (onEnd && secondsLeft === 0) onEnd();
    }, [secondsLeft, onEnd]);

    return <div className={styles.timer}>{formatTime(secondsLeft)}</div>;
};
