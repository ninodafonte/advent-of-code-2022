const input = require("./input");

let elfWithMoreCalories = Math.max(
  ...input.map(
    (element) => { return element.reduce((tmpSum, nextNum) => parseInt(tmpSum) + parseInt(nextNum), 0)}
  )
);

console.log(elfWithMoreCalories)
