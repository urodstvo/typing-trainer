import { Button } from '@/shared/ui/button';

import styles from './settings.module.css';

export const Settings = () => {
    return (
        <div className={styles.settingsContainer}>
            <div className={styles.settingsGroup}>
                <Button variant="primary">punctuation</Button>
                <Button variant="primary">letter case</Button>
            </div>
            <div className={styles.divider} />
            <div className={styles.settingsGroup}>
                <Button variant="primary">30s</Button>
                <Button variant="ghost">60s</Button>
                <Button variant="ghost">90s</Button>
                <Button variant="ghost">120s</Button>
            </div>
            <div className={styles.divider} />
            <div className={styles.settingsGroup}>
                <Button variant="ghost" size="icon">
                    pencil
                </Button>
            </div>
        </div>
    );
};
