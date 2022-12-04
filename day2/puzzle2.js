const input = require("./input");

const sumUp = (tmpSum, nextNum) => tmpSum + nextNum;
const mappedValues = {
  'A': 1,
  'B': 2,
  'C': 3
}

const calculatePointsFunc = (element) => {
  const mapsForLosses = [3, 1, 2];
  const mapsForWins = [8, 9, 7];
  const item1 = Number(element[0]);
  const item2 = element[2];

  if (item2 === 'Y') return item1 + 3;
  if (item2 === 'X') return mapsForLosses[item1 - 1];

  return mapsForWins[item1 - 1];
};

let data = input.replace(/A|B|C/gi, (letter) => mappedValues[letter])
  .split('\n')
  .map(calculatePointsFunc)
  .reduce(sumUp, 0);

console.log(data);