//Which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?
import { puzzleInputReader } from '../utils.js';

const MAX_COUNT = {
    red: 12,
    green: 13,
    blue: 14,
};

const findGameProbability = (file) => {
    const lines = puzzleInputReader(file);
    return lines.map((line) => {
        return line.split(': ')[1].split('; ').map((game) => {
            const bagPulls = game.split(', ');
            return bagPulls.every((pull) => {
                const [count, color] = pull.split(' ');
                return MAX_COUNT[color] >= Number(count);
            });
        }).every((pull) => pull)
    }).reduce((sum, result, i) => {
        return result ? sum + (i + 1) : sum;
    }, 0);
}

console.log(findGameProbability('./input.txt'));