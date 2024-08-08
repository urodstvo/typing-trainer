import { Button } from '@/shared/ui/button';
import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { TextInput } from '@/widgets/TextInput';

import { Stats } from '@/widgets/Stats';

export const HomePage = () => {
    return (
        <>
            <Header />
            <main>
                <TextInput />
                <div>
                    <Stats />
                    <div>
                        <Button>reset</Button>
                        <Button size="icon"></Button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};
