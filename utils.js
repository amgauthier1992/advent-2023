import fs from 'fs';

export const puzzleInputReader = (file) => {
    const lines = fs.readFileSync(file, 'utf-8').split('\n'); //don't actually need .trim()?
    return lines;
};