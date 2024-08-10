import { create } from 'zustand';

const texts = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit et fugiat dolor eligendi, accusantium aliquid? Officiis voluptas numquam a ut, ipsa esse illum veritatis explicabo? Esse enim corporis quo labore!',
    'As the sun dipped below the horizon, the town of Willow Creek began to stir. The air was heavy with the sweet scent of blooming lilacs and the distant chirping of crickets provided a soothing background hum. Rachel walked down Main Street, her eyes scanning the familiar storefronts, her mind still reeling from the events of the day. She had just received a letter from her estranged mother, informing her that she would be arriving in town the following week. Rachel had not seen or spoken to her mother in over a decade, and the prospect of their reunion was both exhilarating and terrifying. As she passed by the old clock tower, she felt a shiver run down her spine - it was as if time itself was standing still, waiting for her to make sense of it all. The streets were quiet, save for the occasional bark of a dog or the distant rumble of a car engine, but Rachel felt like she was being watched, like the very fabric of the town was holding its breath in anticipation of what was to come.',
    "The old mansion loomed before them, its turrets and towers reaching towards the moon like skeletal fingers. The air was heavy with the scent of damp earth and decaying leaves, and the trees seemed to lean in, as if they too were curious about the secrets that lay within. As they stepped inside, the creaking of the wooden floorboards beneath their feet seemed to echo through the empty halls, and Emma couldn't shake the feeling that they were being watched. The rooms were dusty and dimly lit, with cobwebs clinging to the chandeliers and faded portraits hanging on the walls. But despite the sense of neglect and abandonment, there was something undeniably beautiful about the place, a sense of history and mystery that drew her in. She wandered from room to room, her footsteps echoing off the walls, until she came to a door that seemed out of place - it was hidden behind a tapestry, and it looked newer than the rest of the house. The doorknob turned easily in her hand, and she pushed it open to reveal a narrow staircase that led down into darkness. Without hesitation, she began to descend, her heart pounding in her chest, as she felt herself being pulled towards some unknown truth.",
    'The city was a labyrinth of concrete and steel, a maze of towering skyscrapers and cramped alleyways that seemed to stretch on forever. As she walked through the streets, the neon lights of the billboards and storefronts reflected off the wet pavement, casting a kaleidoscope of colors across her face. The sounds of the city surrounded her - the wail of sirens in the distance, the chatter of pedestrians on the sidewalk, the constant hum of traffic. But amidst the chaos, she felt a strange sense of calm, as if she had finally found a place where she belonged. She had always been drawn to the city, with its endless possibilities and hidden secrets. And now, as she walked through its streets, she felt like she was finally discovering who she was meant to be. She turned down a narrow side street, her eyes scanning the crowded storefronts and markets, searching for something - anything - that might give her a sense of direction. The smell of spices and coffee wafted through the air, mingling with the sound of Arabic music and the chatter of strangers. It was like nothing she had ever experienced before, and yet it felt like home.',
    'The forest was a place of ancient magic, where the trees seemed to whisper secrets to each other in the wind. The sunlight filtering through the canopy above cast dappled shadows on the forest floor, and the air was thick with the scent of damp earth and decaying leaves. As they walked deeper into the woods, the silence grew thicker, until it seemed to vibrate with an almost audible hum. The trees grew taller and closer together, their branches tangling overhead like skeletal fingers, and the sound of running water grew louder, until they finally emerged onto the banks of a crystal-clear stream. The water was icy cold, and it seemed to hold a strange, otherworldly power, as if it were a conduit to some deeper, mystical realm. Emma felt a shiver run down her spine as she gazed out across the stream, feeling the weight of centuries of history and mystery bearing down upon her. She knew that she was standing on sacred ground, a place where the veil between the worlds was thin, and where the secrets of the past waited to be uncovered.',
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
