const input = require("./input");

let sumUp = (tmpSum, nextNum) => parseInt(tmpSum) + parseInt(nextNum);

let top3Elves = input.map(
    (element) => { return element.reduce(sumUp, 0)}
).sort((elem1, elem2) => elem2 - elem1).slice(0, 3).reduce(sumUp, 0);

console.log(top3Elves)
