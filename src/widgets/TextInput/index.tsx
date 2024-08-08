import { Timer } from '@/components/Timer';
import clsx from 'clsx';
import { createRef, useEffect, useMemo, useRef } from 'react';

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

const TextContainer = ({ children }: { children: string }) => {
    const text = children;
    const letters = useMemo(() => getLetters(text), [text]);

    const inputRef = useRef<HTMLInputElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);

    const letterRefs = useMemo(
        () =>
            Array.from(text)
                .filter((el) => el !== ' ')
                .map(() => createRef<HTMLSpanElement>()),
        [text],
    );

    useEffect(() => {
        letterRefs[0].current?.classList.add(styles.current);
    }, [letterRefs]);

    return (
        <div className={styles.paper} ref={textContainerRef} tabIndex={0} onFocus={() => inputRef.current?.focus()}>
            {letters.map((word, wordIndex) => (
                <div className={styles.word} key={wordIndex}>
                    {word.map(({ letter, index }) => (
                        <span
                            className={clsx(styles.letter, {
                                [styles.space]: letter === ' ',
                            })}
                            key={index}
                            ref={letterRefs[index]}
                        >
                            {letter}
                        </span>
                    ))}
                </div>
            ))}
            <input
                className={styles.input}
                type="text"
                maxLength={text.length}
                ref={inputRef}
                onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    const index = target.value.length - 1;

                    letterRefs.forEach((l) =>
                        l.current?.classList.remove(styles.current, styles.incorrect, styles.correct),
                    );

                    target.value.split('').forEach((l, i) => {
                        if (l === letterRefs[i].current?.textContent)
                            letterRefs[i].current?.classList.add(styles.correct);
                        else letterRefs[i].current?.classList.add(styles.incorrect);

                        if (i === index) letterRefs[i + 1].current?.classList.add(styles.current);
                    });

                    if (index === -1) letterRefs[0].current?.classList.add(styles.current);
                }}
            />
        </div>
    );
};

export const TextInput = () => {
    const text =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit et fugiat dolor eligendi, accusantium aliquid? Officiis voluptas numquam a ut, ipsa esse illum veritatis explicabo? Esse enim corporis quo labore!';

    return (
        <div className={styles.container}>
            <Timer seconds={5} isStarted onEnd={() => console.log('end')} />
            <TextContainer>{text}</TextContainer>
        </div>
    );
};
