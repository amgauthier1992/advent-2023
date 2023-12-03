import fs from 'fs';

function findCalibrationValues(file) {
	const lines = fs.readFileSync(file, 'utf-8').trim().split('\n');

  	const values = lines.map((line) => {
		let first = line.split('').find((value) => !Number.isNaN(Number(value)));
		let last = line.split('').findLast((value) => !Number.isNaN(Number(value)));
		return Number(first + last);
	})

	return values.reduce((sum, value) => sum + value);
}

console.log(findCalibrationValues('./input.txt'));
