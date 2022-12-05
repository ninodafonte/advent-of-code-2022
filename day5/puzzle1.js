const input = require("./input");
const NUM_OF_CRATES = 9;

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
    .filter((elem, index) => index < 8)
    .reverse()
    .map((elem) => {
      return elem.replace(/ |\[|]/gi, (sym) => mappedValues[sym])
        .replaceAll('----', '#')
        .replaceAll('-', '')
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
  const commands = input.split('\n')
    .filter((elem) => { return elem.substring(0, 4) === 'move' })
    .map((elem) => {
      let matches = elem.match(/move\s(\d*)\sfrom\s(\d*)\sto\s(\d*)/);
      return [matches[1], matches[2], matches[3]]
    });

  return commands;
}

function executeCommands(crates, commands) {
  for (let command in commands) {
    const [numBoxes, srcStack, destStack] = commands[command];
    for (let i = 0; i < numBoxes; i++) {
      let elem = crates[srcStack - 1].pop();
      crates[destStack - 1].push(elem);
    }
  }

  return crates;
}

let crates = parseCrates();

console.log(crates)
let commands = parseCommands();

let result = executeCommands(crates, commands);

console.log(result.map((elem) => elem.pop()).join(''));