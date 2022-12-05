const input = require("./input");
const NUM_OF_CRATES = 3;
const POS_SPAN = 4;

function initCratesContainer() {
  let data = [];
  for (let x = 0; x < NUM_OF_CRATES; x++) {
    data.push([]);
  }

  return data;
}

function containerToStacks(data) {
  let stacks = initCratesContainer();
  for (let i = 0; i < data.length; i++) {
    for (let x = 0; x < data[i].length; x++) {
      if (data[i][x] !== ' ') stacks[x].push(data[i][x]);
    }
  }

  return stacks;
}

function parseCrates(cratesData) {
  let data = initCratesContainer();
  for (let i = 0; i < cratesData.length; i++) {
    for (let x = 1; x < NUM_OF_CRATES * POS_SPAN; x += POS_SPAN) {
      if (cratesData[i][x] !== undefined) data[i].push(cratesData[i][x]);
    }
  }

  return containerToStacks(data);
}

let cratesData = input.split('\n').filter((elem, index) => index < NUM_OF_CRATES).reverse();
let crates = parseCrates(cratesData);

console.log(crates);
