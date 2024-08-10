import { Modal } from '@/components/modal';
import { useHistoryStore } from '@/shared/store/historyStore';
import { useLiveStore } from '@/shared/store/liveStore';
import { Button } from '@/shared/ui/button';
import { useCallback, useMemo } from 'react';

import styles from './result.module.css';

export const ResultModal = () => {
    const isStarted = useLiveStore((state) => state.isStarted);
    const isFinished = useLiveStore((state) => state.isFinished);
    const liveActions = useLiveStore((state) => state.actions);
    const chars = useLiveStore((state) => state.charTyped);
    const time = useLiveStore((state) => state.timeElapsed);
    const errors = useLiveStore((state) => state.errorsCount);

    const historyActions = useHistoryStore((state) => state.actions);

    const accuracy = useMemo(() => {
        const correctCharacters = chars - errors;
        const accuracyVal = Math.round((correctCharacters / chars) * 100);
        return accuracyVal;
    }, [chars, errors]);

    const handleClose = useCallback(() => {
        historyActions.addAccuracy(accuracy);
        historyActions.addErrors(errors);
        historyActions.addWpm(Math.round((chars / 5 / time) * 60));
    }, [accuracy, chars, errors, historyActions, time]);

    return (
        <Modal
            isOpened={isFinished && !isStarted}
            onClose={() => {
                handleClose();
                liveActions.reset();
            }}
            title="Result"
        >
            <div className={styles.modalContent}>
                <div className={styles.modalResults}>
                    <article className={styles.result}>
                        <h3>errors</h3>
                        <p>{errors}</p>
                    </article>
                    <article className={styles.result}>
                        <h3>wpm</h3>
                        <p>{Math.round((chars / 5 / time) * 60)}</p>
                    </article>
                    <article className={styles.result}>
                        <h3>accuracy</h3>
                        <p>{accuracy}%</p>
                    </article>
                </div>
                <footer className={styles.modalFooter}>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            liveActions.repeat();
                            handleClose();
                        }}
                    >
                        Repeat
                    </Button>
                    <Button
                        onClick={() => {
                            handleClose();
                            liveActions.reset();
                        }}
                    >
                        Restart
                    </Button>
                </footer>
            </div>
        </Modal>
    );
};
