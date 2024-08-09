import { useCallback, useEffect, useState } from 'react';

export const useCountdown = (seconds: number) => {
    const [secondsLeft, setSecondsLeft] = useState(0);

    const start = useCallback(() => {
        setSecondsLeft(seconds);
    }, [seconds]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (seconds > 0) {
            timer = setInterval(() => {
                setSecondsLeft((prev) => {
                    if (prev - 1 === 0) clearInterval(timer);
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [seconds]);

    return [secondsLeft, start];
};
