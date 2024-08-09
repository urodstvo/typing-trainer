import { useLiveStore } from '@/shared/store/liveStore';
import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { Settings } from '@/widgets/Settings';
import { TextInput } from '@/widgets/TextInput';

import { AvgStats, Stats } from '@/widgets/Stats';

import styles from './home.module.css';

const Section = () => {
    const isStarted = useLiveStore((state) => state.isStarted);
    const isFinished = useLiveStore((state) => state.isFinished);

    if (!isStarted && !isFinished)
        return (
            <section className={styles.settings} key="settings">
                <Settings />
                <AvgStats />
            </section>
        );
    return (
        <section className={styles.settings} key="settings">
            <Stats />
        </section>
    );
};
export const HomePage = () => {
    return (
        <>
            <Header />
            <main>
                <TextInput />
                <Section />
            </main>
            <Footer />
        </>
    );
};
