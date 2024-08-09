import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
    duration: number;
    checkPunctuation: boolean;
    checkCase: boolean;
};

type Action = {
    actions: {
        setDuration: (duration: number) => void;
        setCheckPunctuation: (checkPunctuation: boolean) => void;
        setCheckCase: (checkCase: boolean) => void;
    };
};

const initialState: State = {
    duration: 30,
    checkPunctuation: true,
    checkCase: true,
};

export const useSettingsStore = create<State & Action>()(
    persist(
        (set) => ({
            ...initialState,
            actions: {
                setDuration: (duration: number) => set({ duration }),
                setCheckPunctuation: (checkPunctuation: boolean) => set({ checkPunctuation }),
                setCheckCase: (checkCase: boolean) => set({ checkCase }),
            },
        }),
        {
            name: 'settings',
            partialize(state) {
                return {
                    duration: state.duration,
                    checkPunctuation: state.checkPunctuation,
                    checkCase: state.checkCase,
                };
            },
        },
    ),
);
