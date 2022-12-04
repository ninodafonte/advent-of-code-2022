const input = require("./input");

let sumUp = (tmpSum, nextNum) => parseInt(tmpSum) + parseInt(nextNum);
const findCommonChars = (elem) => {
  const [rs1, rs2, rs3] = [elem[0], elem[1], elem[2]];
  const repeatedCharRs1Rs2 = rs1.match(new RegExp('[' + rs2 + ']', 'g'));
  const repeatedWithRs3 = repeatedCharRs1Rs2.join().match(new RegExp('[' + rs3 + ']', 'g'));

  return repeatedWithRs3[0];
};

const calculatePriorities = (elem) => {
  return elem.toUpperCase() === elem ? elem.charCodeAt(0) - 38 : elem.charCodeAt(0) - 96;
}

let data = input.split('\n');

let groups = [];
for (let i = 0; i < data.length; i += 3) {
  groups.push([data[i], data[i + 1], data[i + 2]])
}

let priority = groups.map(findCommonChars)
  .map(calculatePriorities)
  .reduce(sumUp, 0);

console.log(priority);