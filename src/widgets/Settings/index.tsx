import { PencilIcon } from '@/shared/icons';
import { useSettingsStore } from '@/shared/store/settingsStore';
import { Button } from '@/shared/ui/button';

import styles from './settings.module.css';

const PunctuationButton = () => {
    const actions = useSettingsStore((state) => state.actions);
    const checkPunctuation = useSettingsStore((state) => state.checkPunctuation);
    return (
        <Button
            variant={checkPunctuation ? 'primary' : 'ghost'}
            onClick={() => actions.setCheckPunctuation(!checkPunctuation)}
        >
            punctuation
        </Button>
    );
};

const CaseButton = () => {
    const actions = useSettingsStore((state) => state.actions);
    const checkCase = useSettingsStore((state) => state.checkCase);
    return (
        <Button variant={checkCase ? 'primary' : 'ghost'} onClick={() => actions.setCheckCase(!checkCase)}>
            letter case
        </Button>
    );
};

const durations = [30, 60, 90, 120];

const DurationButton = ({ duration }: { duration: number }) => {
    const actions = useSettingsStore((state) => state.actions);
    const dur = useSettingsStore((state) => state.duration);
    return (
        <Button variant={dur === duration ? 'primary' : 'ghost'} onClick={() => actions.setDuration(duration)}>
            {duration}s
        </Button>
    );
};

export const Settings = () => {
    return (
        <div className={styles.settingsContainer}>
            <div className={styles.settingsGroup}>
                <PunctuationButton />
                <CaseButton />
            </div>
            <div className={styles.divider} />
            <div className={styles.settingsGroup}>
                {durations.map((duration) => (
                    <DurationButton key={duration} duration={duration} />
                ))}
            </div>
            <div className={styles.divider} />
            <div className={styles.settingsGroup}>
                <Button variant="ghost" size="icon">
                    <PencilIcon width={20} height={20} />
                </Button>
            </div>
        </div>
    );
};
