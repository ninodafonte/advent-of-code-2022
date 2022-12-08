const input = require("./input");

function calculateDistance(data, compareTo) {
  let freeView = 0;
  for (let i = 0; i < data.length; i++) {
    freeView++;
    if (data[i] >= compareTo) break;
  }

  return freeView;
}

let rows = input.split('\n').map((elem) => elem.split(''));
let bestTree = 0;

for (let i = 1; i < rows.length - 1; i++) {
  for (let x = 1; x < rows[i].length - 1; x++) {

    let treesToConsiderUp = [];
    for (let treesUp = i; treesUp > 0; treesUp--) {
      if (rows[treesUp - 1][x] !== null) treesToConsiderUp.push(rows[treesUp - 1][x]);
    }
    let clearUp = calculateDistance(treesToConsiderUp, rows[i][x]);

    let treesToConsiderDown = [];
    for (let treesDown = i; treesDown < rows.length - 1; treesDown++) {
      if (rows[treesDown + 1][x] !== null) treesToConsiderDown.push(rows[treesDown + 1][x]);
    }
    let clearDown = calculateDistance(treesToConsiderDown, rows[i][x]);

    let treesToConsiderLeft = [];
    for (let treesLeft = x; treesLeft > 0; treesLeft--) {
      if (rows[i][treesLeft - 1] !== null) treesToConsiderLeft.push(rows[i][treesLeft - 1]);
    }
    let clearLeft = calculateDistance(treesToConsiderLeft, rows[i][x]);

    let treesToConsiderRight = [];
    for (let treesRight = x; treesRight < rows[i].length - 1; treesRight++) {
      if (rows[i][treesRight + 1] !== null) treesToConsiderRight.push(rows[i][treesRight + 1]);
    }
    let clearRight = calculateDistance(treesToConsiderRight, rows[i][x]);

    let grade = clearLeft * clearRight * clearUp * clearDown;
    if (grade > bestTree) bestTree = grade;
  }
}

console.log(bestTree);