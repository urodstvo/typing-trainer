import { create } from 'zustand';

const texts = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit et fugiat dolor eligendi, accusantium aliquid? Officiis voluptas numquam a ut, ipsa esse illum veritatis explicabo? Esse enim corporis quo labore!',
];

type State = {
    text: string;
    timeElapsed: number;
    isStarted: boolean;
    isFinished: boolean;
    charTyped: number;
    errorsCount: number;
};

type Action = {
    actions: {
        setText: (text: string) => void;
        incTimeElapsed: () => void;
        start: () => void;
        finish: () => void;
        incCharTyped: () => void;
        incErrorsCount: () => void;
        reset: () => void;
        repeat: () => void;
    };
};

const initialState: State = {
    text: texts[Math.round(Math.random() * (texts.length - 1))],
    timeElapsed: 0,
    isStarted: false,
    isFinished: false,
    charTyped: 0,
    errorsCount: 0,
};

export const useLiveStore = create<State & Action>()((set) => ({
    ...initialState,
    actions: {
        setText: (text: string) =>
            set({ text: text === '' ? texts[Math.round(Math.random() * (texts.length - 1))] : text }),
        incTimeElapsed: () => set((state) => ({ timeElapsed: state.timeElapsed + 1 })),
        start: () => set({ isStarted: true, isFinished: false }),
        finish: () => set({ isStarted: false, isFinished: true }),
        incCharTyped: () => set((state) => ({ charTyped: state.charTyped + 1 })),
        incErrorsCount: () => set((state) => ({ errorsCount: state.errorsCount + 1 })),
        reset: () => set({ ...initialState, text: texts[Math.round(Math.random() * (texts.length - 1))] }),
        repeat: () => set((state) => ({ ...initialState, text: state.text })),
    },
}));
