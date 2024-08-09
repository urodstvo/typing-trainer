import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { Settings } from '@/widgets/Settings';
import { TextInput } from '@/widgets/TextInput';

import { Stats } from '@/widgets/Stats';

import styles from './home.module.css';

export const HomePage = () => {
    return (
        <>
            <Header />
            <main>
                <TextInput />
                <section className={styles.settings}>
                    <Settings />
                    <Stats />
                </section>
            </main>
            <Footer />
        </>
    );
};
