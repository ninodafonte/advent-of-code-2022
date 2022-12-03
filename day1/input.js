const fs = require("fs");
const path = require("path");

const rawInputPath = path.join(__dirname, "input.txt");
const rawInput = fs.readFileSync(rawInputPath, "utf8");

const rawData = rawInput.trim().split("\n");

let elves = [];
while (rawData.length) {
  let firstEmpty = rawData.findIndex(element => element == '');
  elves.push(rawData.splice(0, firstEmpty));
  rawData.shift();
}

module.exports = elves;
