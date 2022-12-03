const input = require("./input");

let reduceFun = (tmpSum, nextNum) => parseInt(tmpSum) + parseInt(nextNum);

let top3Elves = input.map(
    (element) => { return element.reduce(reduceFun, 0)}
).sort((elem1, elem2) => elem2 - elem1).slice(0, 3).reduce(reduceFun, 0);

console.log(top3Elves)
