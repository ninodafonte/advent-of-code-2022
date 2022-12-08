# Day 8: Treetop Tree House

You can find the puzzles [here](https://adventofcode.com/2022/day/8).

## ✍🏼 Input

The expedition comes across a peculiar patch of tall trees all planted carefully in a grid. The Elves explain that a previous expedition planted these trees as a reforestation effort. Now, they're curious if this would be a good location for a tree house.

First, determine whether there is enough tree cover here to keep a tree house hidden. To do this, you need to count the number of trees that are visible from outside the grid when looking directly along a row or column.

The Elves have already launched a quadcopter to generate a map with the height of each tree (your puzzle input). For example:

Example:

```text
30373
25512
65332
33549
35390
```

## 🧩 First puzzle

### Objective

Consider your map; how many trees are visible from outside the grid?

### Solution

Not very performance but fun to build. O(2), finding the rest of the elements (up, down, left and right) for each occurrence.
Using a function to determined if the tree is visible based on that information.

```js
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
```
The magic is inside a function that creates an score, which is later changed to calculate a different score with the same data and solve puzzle 2.

```js
function checkHeightLimits(data, compareTo) {
  return compareTo > Math.max(...data);
}
```

## 🧩 Second puzzle

### Objective

Consider each tree on your map. What is the highest scenic score possible for any tree?

### Solution

TODO: Add second puzzle solution explanation

```js
function calculateDistance(data, compareTo) {
  let freeView = 0;
  for (let i = 0; i < data.length; i++) {
    freeView++;
    if (data[i] >= compareTo) break;
  }

  return freeView;
}
```
