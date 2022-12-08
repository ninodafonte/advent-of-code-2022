const input = require("./input");

function checkHeightLimits(data, compareTo) {
  return compareTo > Math.max(...data);
}

let rows = input.split('\n').map((elem) => elem.split(''));

let visibleTrees = ((rows[0].length - 1) * 2) + ((rows.length - 1) * 2);
for (let i = 1; i < rows.length - 1; i++) {
  for (let x = 1; x < rows[i].length - 1; x++) {

    let treesToConsiderUp = [];
    for (let treesUp = i; treesUp > 0; treesUp--) {
      if (rows[treesUp - 1][x] !== null) treesToConsiderUp.push(rows[treesUp - 1][x]);
    }
    let clearUp = checkHeightLimits(treesToConsiderUp, rows[i][x]);

    let treesToConsiderDown = [];
    for (let treesDown = i; treesDown < rows.length - 1; treesDown++) {
      if (rows[treesDown + 1][x] !== null) treesToConsiderDown.push(rows[treesDown + 1][x]);
    }
    let clearDown = checkHeightLimits(treesToConsiderDown, rows[i][x]);

    let treesToConsiderLeft = [];
    for (let treesLeft = x; treesLeft > 0; treesLeft--) {
      if (rows[i][treesLeft - 1] !== null) treesToConsiderLeft.push(rows[i][treesLeft - 1]);
    }
    let clearLeft = checkHeightLimits(treesToConsiderLeft, rows[i][x]);

    let treesToConsiderRight = [];
    for (let treesRight = x; treesRight < rows[i].length - 1; treesRight++) {
      if (rows[i][treesRight + 1] !== null) treesToConsiderRight.push(rows[i][treesRight + 1]);
    }
    let clearRight = checkHeightLimits(treesToConsiderRight, rows[i][x]);

    if (clearUp || clearDown || clearRight || clearLeft) visibleTrees++;
  }
}

console.log(visibleTrees);