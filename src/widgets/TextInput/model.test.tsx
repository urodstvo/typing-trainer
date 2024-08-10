import { getLetters } from './model';

describe('Text Input Model ', () => {
    it('getLetters should be correct ', () => {
        expect(getLetters('hello world')).toStrictEqual([
            [
                {
                    letter: 'h',
                    index: 0,
                },
                {
                    letter: 'e',
                    index: 1,
                },
                {
                    letter: 'l',
                    index: 2,
                },
                {
                    letter: 'l',
                    index: 3,
                },
                {
                    letter: 'o',
                    index: 4,
                },
                {
                    letter: ' ',
                    index: 5,
                },
            ],
            [
                {
                    letter: 'w',
                    index: 6,
                },
                {
                    letter: 'o',
                    index: 7,
                },
                {
                    letter: 'r',
                    index: 8,
                },
                {
                    letter: 'l',
                    index: 9,
                },
                {
                    letter: 'd',
                    index: 10,
                },
            ],
        ]);
    });
});
