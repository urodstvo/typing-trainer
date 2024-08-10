import { useLiveStore } from '@/shared/store/liveStore';
import { useSettingsStore } from '@/shared/store/settingsStore';
import { useEffect, useState } from 'react';

import styles from './timer.module.css';

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const Timer = () => {
    const duration = useSettingsStore((state) => state.duration);

    const isStarted = useLiveStore((state) => state.isStarted);
    const isFinished = useLiveStore((state) => state.isFinished);
    const liveActions = useLiveStore((state) => state.actions);

    const [secondsLeft, setSecondsLeft] = useState<number>(duration);

    // when timer isn't started, set new duration
    useEffect(() => {
        if (!isStarted && !isFinished) setSecondsLeft(duration);
    }, [duration, isStarted, isFinished]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (isStarted && !isFinished)
                setSecondsLeft((prev) => {
                    if (prev - 1 <= 0) clearInterval(timer);
                    return prev - 1;
                });
        }, 1000);

        return () => clearInterval(timer);
    }, [isStarted, isFinished]);

    useEffect(() => {
        if (isStarted) liveActions.incTimeElapsed();
    }, [secondsLeft, liveActions, isStarted]);

    useEffect(() => {
        if (secondsLeft === 0) liveActions.finish();
    }, [secondsLeft, liveActions]);

    return <div className={styles.timer}>{formatTime(secondsLeft)}</div>;
};
