import { puzzleInputReader } from '../utils.js';

//forEach edits the array in place. It does not return an array like .map()
//Can't do tickets.forEach((ticket) => ticket.split('|')[0]); //undefined

const findScratchPoints = (file) => {
    const lines = puzzleInputReader(file);
    const tickets = lines.map((line) => line.split(': ')[1]);
    const winningNums = tickets.map((ticket) => ticket.trim().split('|')[0]);
    const playNums = tickets.map((ticket) => ticket.trim().split('|')[1]);
    let totalPoints = 0;

    for(let i = 0; i < winningNums.length; i++){
        const winningSet = new Set(winningNums[i].trim().split(' '));
        const playSet = new Set(playNums[i].trim().split(' '));
        let points = 0;
        let hasPreviouslyMatched = false;

        for(let key of winningSet){
            if(playSet.has(key) && !hasPreviouslyMatched){
                points += 1;
                hasPreviouslyMatched = true;
            } else if(playSet.has(key) && hasPreviouslyMatched){
                points *= 2;
            } else {
                continue;
            }
        }

        totalPoints += points;
    }

    return totalPoints;
}

// findScratchPoints('./example.txt');
console.log(findScratchPoints('./example.txt'));
console.log(findScratchPoints('./input.txt'));
