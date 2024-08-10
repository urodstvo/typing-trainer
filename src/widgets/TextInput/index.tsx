import { Timer } from '@/components/Timer';
import { Modal } from '@/components/modal';
import { useHistoryStore } from '@/shared/store/historyStore';
import { useLiveStore } from '@/shared/store/liveStore';
import { useSettingsStore } from '@/shared/store/settingsStore';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import clsx from 'clsx';
import { createRef, useCallback, useEffect, useMemo, useRef } from 'react';

import styles from './textinput.module.css';

const getLetters = (text: string) => {
    let index = 0;
    const words = text.split(' ');
    const res = [] as { letter: string; index: number }[][];

    for (let word = 0; word < words.length; word++) {
        res.push([]);
        for (let letter = 0; letter < words[word].length; letter++) {
            res[word].push({
                letter: words[word].charAt(letter),
                index: index++,
            });
        }
        if (word !== words.length - 1)
            res[word].push({
                letter: ' ',
                index: index++,
            });
    }

    return res;
};

const TextContainer = () => {
    const liveActions = useLiveStore((state) => state.actions);
    const textSrc = useLiveStore((state) => state.text);
    const isStarted = useLiveStore((state) => state.isStarted);
    const isFinished = useLiveStore((state) => state.isFinished);

    const checkCase = useSettingsStore((state) => state.checkCase);
    const checkPunctuation = useSettingsStore((state) => state.checkPunctuation);

    const text = useMemo(() => {
        let res = textSrc;
        if (!checkCase) res = res.toLowerCase();
        if (!checkPunctuation) res = res.replace(/[^\w\s]/gi, '');

        return res;
    }, [textSrc, checkCase, checkPunctuation]);

    const inputRef = useRef<HTMLInputElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);

    const letters = useMemo(() => getLetters(text), [text]);
    const letterRefs = useMemo(() => text.split('').map(() => createRef<HTMLSpanElement>()), [text]);

    useEffect(() => {
        letterRefs[0].current?.classList.add(styles.current);
    }, [letterRefs]);

    useEffect(() => {
        const input = inputRef.current as HTMLInputElement;
        if (!isStarted && !isFinished) {
            input.value = '';
            input.dispatchEvent(new Event('input'));
        }
    }, [text, isStarted, isFinished]);

    const handleChange = useCallback(
        (e: Event) => {
            const target = e.target as HTMLInputElement;
            const index = target.value.length - 1;

            if (!checkCase) target.value = target.value.toLowerCase();

            liveActions.incCharTyped();
            if (index >= 0 && target.value[index] !== letterRefs[index].current?.textContent)
                liveActions.incErrorsCount();
            letterRefs.forEach((l) => l.current?.classList.remove(styles.current, styles.incorrect, styles.correct));

            target.value.split('').forEach((l, i) => {
                if (l === letterRefs[i].current?.textContent) letterRefs[i].current?.classList.add(styles.correct);
                else letterRefs[i].current?.classList.add(styles.incorrect);

                if (i === index && i < letterRefs.length - 1) letterRefs[i + 1].current?.classList.add(styles.current);
            });

            if (index === -1) letterRefs[0].current?.classList.add(styles.current);

            if (index === letterRefs.length - 1) liveActions.finish();
        },
        [letterRefs, liveActions, checkCase],
    );

    useEffect(() => {
        const input = inputRef.current as HTMLInputElement;
        input.addEventListener('input', handleChange);

        return () => input.removeEventListener('input', handleChange);
    }, [handleChange]);

    return (
        <>
            <div className={styles.paper} ref={textContainerRef} tabIndex={0} onFocus={() => inputRef.current?.focus()}>
                {letters.map((word, wordIndex) => (
                    <div className={styles.word} key={wordIndex}>
                        {word.map(({ letter, index }) => (
                            <span
                                className={clsx(styles.letter, {
                                    [styles.space]: letter === ' ',
                                })}
                                key={`${letter}${index}`}
                                ref={letterRefs[index]}
                            >
                                {letter}
                            </span>
                        ))}
                    </div>
                ))}
                <Input
                    className={styles.input}
                    ref={inputRef}
                    maxLength={text.length}
                    onInput={() => !isStarted && !isFinished && liveActions.start()}
                    onPaste={(e) => e.preventDefault()}
                    autoFocus
                />
            </div>
            {isStarted ? (
                <Button
                    tabIndex={1}
                    onClick={() => {
                        liveActions.reset();
                        inputRef.current?.focus();
                    }}
                >
                    restart
                </Button>
            ) : (
                <p className={styles.tip}>start typing to start training</p>
            )}
        </>
    );
};

export const TextInput = () => {
    return (
        <section className={styles.container}>
            <Timer />
            <TextContainer />
            <ResultModal />
        </section>
    );
};

const ResultModal = () => {
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
