const input = require("./input");

let sumUp = (tmpSum, nextNum) => parseInt(tmpSum) + parseInt(nextNum);
const cleanUpStrings = (elem) => {
  const cutIndex = Math.floor(elem.length / 2);
  const [rs1, rs2] = [elem.slice(0, cutIndex), elem.slice(cutIndex)];
  const repeatedChar = rs1.match(new RegExp('[' + rs2 + ']', 'g'));

  return repeatedChar[0];
};

const calculatePriorities = (elem) => {
  return elem.toUpperCase() === elem ? elem.charCodeAt(0) - 38 : elem.charCodeAt(0) - 96;
}

let data = input.split('\n')
  .map(cleanUpStrings)
  .map(calculatePriorities)
  .reduce(sumUp, 0);

console.log(data);