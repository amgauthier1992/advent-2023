import fs from 'fs';

export const puzzleInputReader = (file) => {
    const lines = fs.readFileSync(file, 'utf-8').trim().split('\n');
    return lines;
};