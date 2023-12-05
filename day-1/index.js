import { puzzleInputReader } from '../utils.js';

function findCalibrationValues(file) {
	const lines = puzzleInputReader(file);

  	const values = lines.map((line) => {
		let first = line.split('').find((value) => !Number.isNaN(Number(value)));
		let last = line.split('').findLast((value) => !Number.isNaN(Number(value)));
		return Number(first + last);
	})

	return values.reduce((sum, value) => sum + value);
}

console.log(findCalibrationValues('./input.txt'));
