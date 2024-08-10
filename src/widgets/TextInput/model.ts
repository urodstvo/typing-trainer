export const getLetters = (text: string) => {
    let index = 0;
    const words = text.split(' ');
    const res = [] as { letter: string; index: number }[][];

    for (let word = 0; word < words.length; word++) {
        res.push([]);
        for (let letter = 0; letter < words[word].length; letter++) {
            res[word].push({
                letter: words[word].charAt(letter),
                index: index++,
            });
        }
        if (word !== words.length - 1)
            res[word].push({
                letter: ' ',
                index: index++,
            });
    }

    return res;
};
