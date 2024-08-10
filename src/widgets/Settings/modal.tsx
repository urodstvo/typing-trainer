import { Modal } from '@/components/modal';
import { PencilIcon } from '@/shared/icons';
import { useLiveStore } from '@/shared/store/liveStore';
import { useSettingsStore } from '@/shared/store/settingsStore';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useId, useRef, useState } from 'react';

import styles from './settings.module.css';

export const SettingsModal = () => {
    const durationId = useId();
    const textId = useId();

    const durationRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLTextAreaElement>(null);

    const settingsActions = useSettingsStore((state) => state.actions);
    const liveActions = useLiveStore((state) => state.actions);

    const [isOpened, setIsOpened] = useState(false);

    return (
        <div className={styles.settingsGroup}>
            <Button variant="ghost" size="icon" onClick={() => setIsOpened(true)} aria-label="Open Settings Modal">
                <PencilIcon width={20} height={20} />
            </Button>
            <Modal isOpened={isOpened} onClose={() => setIsOpened(false)} title="Custom Settings">
                <div className={styles.modalBody}>
                    <div className={styles.container}>
                        <label htmlFor={durationId}>Duration, s</label>
                        <Input id={durationId} type="number" placeholder="60" aria-label="Duration" ref={durationRef} />
                        <label htmlFor={textId}>Custom Text</label>
                        <textarea
                            className={styles.textarea}
                            name="custom-text"
                            id={textId}
                            placeholder="Leave the field blank to get random text"
                            autoComplete="off"
                            ref={textRef}
                        />
                    </div>
                    <footer className={styles.modalFooter}>
                        <Button
                            onClick={() => {
                                if (durationRef.current?.value !== '') {
                                    settingsActions.setDuration(Number(durationRef.current?.value));
                                }
                                if (textRef.current) liveActions.setText(textRef.current?.value);

                                setIsOpened(false);
                            }}
                        >
                            Save
                        </Button>
                    </footer>
                </div>
            </Modal>
        </div>
    );
};
