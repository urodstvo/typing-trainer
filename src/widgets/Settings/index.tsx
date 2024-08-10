import { CaseButton, DurationButton, PunctuationButton } from './buttons';
import { SettingsModal } from './modal';
import styles from './settings.module.css';

const durations = [30, 60, 90, 120];

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
            <SettingsModal />
        </div>
    );
};
