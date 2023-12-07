import { puzzleInputReader } from '../utils.js';

// 467..114.. //4 is [0,0], 6 is [0,1], 7 is [0,2]
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..

//114 is not a part #, 58 is not a part # (not adjacent or diagonal to symbol)

//How do we know if the number is a part number or not?
//It touches a symbol in any way (above, below, left, right, diagonal below left, diagonal below right, diagonal above left, diagonal above right).

//examines substrings to see if they contain a symbol other than '.'
const hasSymbol = (str) => {
  if(str?.length && str.split('').find(x => isNaN(x) && x !== '.')){
    return true;
  }
  
  return false;
}

const findMissingPartNumber = (file) => {
  const lines = puzzleInputReader(file);
  const totalRows = lines.length;
  const rowLength = lines[0].length; //all individual rows have same length so lines[0].length === lines[1].length
  
  let partNumbers = [];

  for(let i = 0; i < totalRows; i++){
    for(let j = 0; j < rowLength; j++){
      const currentChar = lines[i][j]; //0,0 , 0,1 , 0,2 , 0,3 , 0,4 , 0,5 , 0,6 , 0,7 , 0,8 , 0,9 , 1,0 , 1,1 , etc.

      if(isNaN(currentChar)) continue;
      
      let number = currentChar; //this will be a str that we will be concatenating

      while(j++ < rowLength){ 
        if(Number.isInteger(parseInt(lines[i][j]))){
          number += lines[i][j]; //add number to our string representation of the part number
        } else break;
      }
      
      const topSubstr = i === 0 ? '' : lines[i - 1].substring(j - number.length - 1, j + 1); //if we're on top row, string is empty, otherwise look at the previous row and create a substring that starts at the top left diagonal (j - number.length - 1) and ends with the top right diagonal (j + 1).
      const bottomSubstr = i === totalRows -  1 ? '' : lines[i + 1].substring(j - number.length - 1, j + 1); //if we're at our bottom row, str is empty, otherwise look at the next row and create a substring that starts at the bottom left diagonal (j - number.length - 1) and ends with the bottom right diagonal (j + 1).
      const leftCharOfPartNumber = lines[i][j - number.length - 1] || '';
      const rightCharOfPartNumber = lines[i][j] || ''; 

      if(hasSymbol(topSubstr) || hasSymbol(bottomSubstr) || hasSymbol(leftCharOfPartNumber) || hasSymbol(rightCharOfPartNumber)){
        partNumbers.push(Number(number));
      }
    }
  }

  return partNumbers.reduce((sum, partNum) => sum + partNum, 0);
}

// console.log(findMissingPartNumber('./example.txt'));
console.log(findMissingPartNumber('./input.txt'));
