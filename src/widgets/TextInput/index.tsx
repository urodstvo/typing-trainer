import { Timer } from '@/components/Timer';
import { useLiveStore } from '@/shared/store/liveStore';
import { useSettingsStore } from '@/shared/store/settingsStore';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import clsx from 'clsx';
import { createRef, useCallback, useEffect, useMemo, useRef } from 'react';

import { getLetters } from './model';
import { ResultModal } from './result';
import styles from './textinput.module.css';

const TextContainer = () => {
    const liveActions = useLiveStore((state) => state.actions);
    const textSrc = useLiveStore((state) => state.text);
    const isStarted = useLiveStore((state) => state.isStarted);
    const isFinished = useLiveStore((state) => state.isFinished);

    const checkCase = useSettingsStore((state) => state.checkCase);
    const checkPunctuation = useSettingsStore((state) => state.checkPunctuation);

    // format text according to settings
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

    // set caret to beginning
    useEffect(() => {
        letterRefs[0].current?.classList.add(styles.current);
    }, [letterRefs]);

    // reset states
    useEffect(() => {
        if (!isStarted && !isFinished) {
            const input = inputRef.current as HTMLInputElement;
            input.value = '';
            letterRefs.forEach((l) => l.current?.classList.remove(styles.current, styles.incorrect, styles.correct));
            if (textContainerRef.current) textContainerRef.current.style.transform = `translate(0, 0)`;
        }
    }, [text, isStarted, isFinished, letterRefs]);

    const handleChange = useCallback(
        (e: Event) => {
            const target = e.target as HTMLInputElement;
            const index = target.value.length - 1;

            // scroll line
            if (index >= 0) {
                const ind = index;
                if (textContainerRef.current && letterRefs[ind].current) {
                    const rect = textContainerRef.current.getBoundingClientRect();
                    const letterRect = letterRefs[ind].current.getBoundingClientRect();

                    const diff = letterRect?.y - rect?.y;
                    textContainerRef.current.style.transform = `translate(0, -${diff}px)`;
                }
            }

            if (!checkCase) target.value = target.value.toLowerCase();

            liveActions.incCharTyped();
            if (index >= 0 && target.value[index] !== letterRefs[index].current?.textContent)
                liveActions.incErrorsCount();

            // reset classes
            letterRefs.forEach((l) => l.current?.classList.remove(styles.current, styles.incorrect, styles.correct));

            // set classes
            target.value.split('').forEach((l, i) => {
                if (l === letterRefs[i].current?.textContent) letterRefs[i].current?.classList.add(styles.correct);
                else letterRefs[i].current?.classList.add(styles.incorrect);

                if (i === index && i < letterRefs.length - 1) letterRefs[i + 1].current?.classList.add(styles.current);
            });

            if (index === -1) {
                letterRefs[0].current?.classList.add(styles.current);
                if (textContainerRef.current) textContainerRef.current.style.transform = `translate(0, 0)`;
            }

            if (index === letterRefs.length - 1) liveActions.finish();
        },
        [letterRefs, liveActions, checkCase],
    );

    // add event listner to input
    useEffect(() => {
        const input = inputRef.current as HTMLInputElement;
        input.addEventListener('input', handleChange);

        return () => input.removeEventListener('input', handleChange);
    }, [handleChange]);

    return (
        <>
            <div className={styles.paperContainer}>
                <div className={styles.paper} ref={textContainerRef} onClick={() => inputRef.current?.focus()}>
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
                </div>
                <Input
                    className={styles.input}
                    ref={inputRef}
                    maxLength={text.length}
                    onInput={() => !isStarted && !isFinished && liveActions.start()}
                    onPaste={(e) => e.preventDefault()}
                    disabled={isFinished}
                    autoFocus
                />
            </div>
            {isStarted ? (
                <Button
                    tabIndex={0}
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
