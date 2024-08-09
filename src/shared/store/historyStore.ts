import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
    wpm: number[];
    errors: number[];
    accuracy: number[];
};

type Action = {
    actions: {
        addWpm: (wpm: number) => void;
        addErrors: (errors: number) => void;
        addAccuracy: (accuracy: number) => void;
    };
};

export const useHistoryStore = create<State & Action>()(
    persist(
        (set) => ({
            wpm: [],
            errors: [],
            accuracy: [],
            actions: {
                addWpm: (wpm: number) => set((state) => ({ wpm: [...state.wpm, wpm] })),
                addErrors: (errors: number) => set((state) => ({ errors: [...state.errors, errors] })),
                addAccuracy: (accuracy: number) => set((state) => ({ accuracy: [...state.accuracy, accuracy] })),
            },
        }),
        {
            name: 'history',
            partialize: (state) => ({ wpm: state.wpm, errors: state.errors, accuracy: state.accuracy }),
        },
    ),
);
