const input = require("./input");

const mappedValues = {
  'A': 1,
  'B': 2,
  'C': 3,
  'X': 1,
  'Y': 2,
  'Z': 3
}

const sumUp = (tmpSum, nextNum) => tmpSum + nextNum;
const calculatePointsFunc = (element) => {
  const item1 = Number(element[0]);
  const item2 = Number(element[2]);

  if (item1 === item2) return (item2 + 3);

  if (item1 === 1) return item2 === 2 ? item2 + 6 : item2;
  if (item1 === 2) return item2 === 3 ? item2 + 6 : item2;

  return item2 === 1 ? item2 + 6 : item2;
};

let data = input.replace(/A|B|C|X|Y|Z/gi, (letter) => mappedValues[letter])
  .split('\n')
  .map(calculatePointsFunc)
  .reduce(sumUp, 0);

console.log(data);