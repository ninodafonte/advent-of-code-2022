# Day 3: Rucksack Reorganization

You can find the puzzles [here](https://adventofcode.com/2022/day/3).

## ✍🏼 Input

The input describes the content of the Rucksacks of the elves. Each line is two compartments (with the same size).
Every letter is a type of thing saved there. One type of thing should only be in one of the two compartments but the elves made a mistake.
You have to find which types are duplicated (they are in both sides of the rucksack). There is only one duplicate and each type has a value.

Example:

```text
rNZNWvMZZmDDmwqNdZrWTqhJMhhgzggBhzBJBchQzzJJ
pHlSVbVbFHgHBzzhQHqg
nVsqGpbbtDtTNmrmfZ
zrBMnbzBchshsttfbMRBgmJggmmCHGgDhDgNDGHL
VddZqQqdvSQMJHJGdCDCDDmH
pZWWllPQlPZQvZvwpSVlqlvtfswMRzBbntzRbzbfstsRzF
```

## 🧩 First puzzle

### Objective

The puzzle asks for the sum of the values for the duplicates.

### Solution

There are two pieces to put together to solve this puzzle

- find the duplicates: I opted to use match with a regular expression, using as the expression the contents of one of the strings (like simulating an intersection). Then we just use the first result of the match (it gives us one for each side, always the same in our exercise).
- calculate de value: I based the calculation on the ascii value of the character so using an offset (different if uppercase/lowercase) we can easily get to the priority number for the elves.

```js
let sumUp = (tmpSum, nextNum) => parseInt(tmpSum) + parseInt(nextNum);
const cleanUpStrings = (elem) => {
  const cutIndex = Math.floor(elem.length / 2);
  const [rs1, rs2] = [elem.slice(0, cutIndex), elem.slice(cutIndex)];
  const repeatedChar = rs1.match(new RegExp('[' + rs2 + ']', 'g'));

  return repeatedChar[0];
};

const calculatePriorities = (elem) => {
  return elem.toUpperCase() === elem ? elem.charCodeAt(0) - 38 : elem.charCodeAt(0) - 96;
}

let data = input.split('\n')
  .map(cleanUpStrings)
  .map(calculatePriorities)
  .reduce(sumUp, 0);
```

## 🧩 Second puzzle

### Objective

Here, in pragmatic terms, we need to find the duplicates in groups of 3 strings (because elves go around in groups of 3, you knew that...)

### Solution

In this case, I prepared the data in advanced (using a loop to create the array with groups of 3).

The next step was just to refactor a bit the findCommonChars function to use 3 instead of 2 strings for the matches.
What I really do there is to find the matches between the first and second string and use those matches to match with the 3rd string.

```js
let sumUp = (tmpSum, nextNum) => parseInt(tmpSum) + parseInt(nextNum);
const findCommonChars = (elem) => {
  const [rs1, rs2, rs3] = [elem[0], elem[1], elem[2]];
  const repeatedCharRs1Rs2 = rs1.match(new RegExp('[' + rs2 + ']', 'g'));
  const repeatedWithRs3 = repeatedCharRs1Rs2.join().match(new RegExp('[' + rs3 + ']', 'g'));

  return repeatedWithRs3[0];
};

const calculatePriorities = (elem) => {
  return elem.toUpperCase() === elem ? elem.charCodeAt(0) - 38 : elem.charCodeAt(0) - 96;
}

let data = input.split('\n');

let groups = [];
for (let i = 0; i < data.length; i += 3) {
  groups.push([data[i], data[i + 1], data[i + 2]])
}

let priority = groups.map(findCommonChars)
  .map(calculatePriorities)
  .reduce(sumUp, 0);

console.log(priority);
```
