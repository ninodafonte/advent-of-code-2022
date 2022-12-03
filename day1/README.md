# Day 1: Calorie Counting

You can find the puzzles [here](https://adventofcode.com/2022/day/1).

## ✍🏼 Input

Array of arrays (each one with the calories for each elf)

Example:

```js
 [
  [
    '7914',  '5032',
    '11424', '2567',
    '4123',  '3567',
    '7346'
  ],
  [
    '1334', '2173', '5437',
    '1104', '1872', '1148',
    '6547', '3149', '5923',
    '5705', '4036', '5348',
    '1100'
  ],
  [ '4108', '14444', '25596' ]
]
```

## 🧩 First puzzle

### Objective

Find the elf carrying the most calories.

### Solution

Sum of the array, then max of the resulting arrays using the spread operator (as they are 1 item arrays after the sum).

```js
let elfWithMoreCalories = Math.max(
  ...input.map(
    (element) => { return element.reduce((tmpSum, nextNum) => parseInt(tmpSum) + parseInt(nextNum), 0)}
  )
);
```

## 🧩 Second puzzle

### Objective

Sum of the top 3 elves carrying the most calories.

### Solution

Slight variation of the previous solution, just using the sort method and slicing the final ranking.

```js
let top3Elves = input.map(
  (element) => { return element.reduce(reduceFun, 0)}
).sort((elem1, elem2) => elem2 - elem1).slice(0, 3).reduce(reduceFun, 0);
```
