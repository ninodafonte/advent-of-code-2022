const input = require("./input");
const NUM_OF_CRATES = 3;

const mappedValues = {
  ' ': '-',
  '[': '#',
  ']': ''
}

function initCratesContainer() {
  let data = [];
  for (let x = 0; x < NUM_OF_CRATES; x++) {
    data.push([]);
  }

  return data;
}

function parseCrates() {
  let data = initCratesContainer();
  let cratesData = input.split('\n')
    .filter((elem, index) => index < NUM_OF_CRATES)
    .reverse()
    .map((elem) => {
      return elem.replace(/ |\[|]/gi, (sym) => mappedValues[sym])
        .replace('--', '#')
        .replace(/-/gi, '')
        .substring(1)
    });

  for (let i = 0; i < cratesData.length; i++) {
    let crateIndex = 0;
    for (let x = 0; x < cratesData[i].length; x++) {
      if (cratesData[i][x] === '#') { crateIndex++; continue; }
      data[crateIndex].push(cratesData[i][x]);
    }
  }

  return data;
}

function parseCommands() {

}

let crates = parseCrates();
let commands = parseCommands();

console.log(crates);
