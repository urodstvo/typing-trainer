import { useSettingsStore } from '@/shared/store/settingsStore';
import { Button } from '@/shared/ui/button';

export const PunctuationButton = () => {
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

export const CaseButton = () => {
    const actions = useSettingsStore((state) => state.actions);
    const checkCase = useSettingsStore((state) => state.checkCase);
    return (
        <Button variant={checkCase ? 'primary' : 'ghost'} onClick={() => actions.setCheckCase(!checkCase)}>
            letter case
        </Button>
    );
};

export const DurationButton = ({ duration }: { duration: number }) => {
    const actions = useSettingsStore((state) => state.actions);
    const dur = useSettingsStore((state) => state.duration);
    return (
        <Button variant={dur === duration ? 'primary' : 'ghost'} onClick={() => actions.setDuration(duration)}>
            {duration}s
        </Button>
    );
};
